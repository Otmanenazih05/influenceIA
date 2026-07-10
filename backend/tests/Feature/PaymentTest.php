<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\Campaign;
use App\Models\CampaignApplication;
use App\Models\ContentSubmission;
use App\Models\Payment;
use App\Models\Withdrawal;
use App\Enums\UserRole;
use App\Enums\ApplicationStatus;
use App\Enums\PaymentStatus;
use App\Enums\SubmissionStatus;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->brandUser = User::factory()->create(['role' => UserRole::Brand]);
        $this->brandProfile = BrandProfile::factory()->create(['user_id' => $this->brandUser->id]);
        
        $this->influencerUser = User::factory()->create(['role' => UserRole::Influencer]);
        $this->influencerProfile = InfluencerProfile::factory()->create(['user_id' => $this->influencerUser->id]);
        
        $this->campaign = Campaign::factory()->create([
            'brand_profile_id' => $this->brandProfile->id,
            'budget' => 500,
        ]);
        
        $this->application = CampaignApplication::factory()->create([
            'campaign_id' => $this->campaign->id,
            'influencer_profile_id' => $this->influencerProfile->id,
            'status' => ApplicationStatus::Accepted,
        ]);
    }

    public function test_brand_can_initiate_payment()
    {
        $response = $this->actingAs($this->brandUser)->postJson("/api/applications/{$this->application->id}/payments/initiate", [
            'amount' => 500,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.status', 'pending');
                 
        $this->assertDatabaseHas('payments', [
            'campaign_application_id' => $this->application->id,
            'amount' => 500,
            'status' => 'pending'
        ]);
    }

    public function test_brand_cannot_initiate_payment_for_unaccepted_application()
    {
        $this->application->update(['status' => ApplicationStatus::Pending]);

        $response = $this->actingAs($this->brandUser)->postJson("/api/applications/{$this->application->id}/payments/initiate", [
            'amount' => 500,
        ]);

        $response->assertStatus(400);
    }

    public function test_brand_can_fund_payment()
    {
        $payment = Payment::factory()->create([
            'campaign_application_id' => $this->application->id,
            'amount' => 500,
            'status' => PaymentStatus::Pending,
        ]);

        $response = $this->actingAs($this->brandUser)->putJson("/api/payments/{$payment->id}/fund");

        $response->assertStatus(200)
                 ->assertJsonPath('data.status', 'in_escrow');
    }

    public function test_brand_cannot_release_without_approved_submission()
    {
        $payment = Payment::factory()->create([
            'campaign_application_id' => $this->application->id,
            'amount' => 500,
            'status' => PaymentStatus::InEscrow,
        ]);

        // No submission
        $response = $this->actingAs($this->brandUser)->putJson("/api/payments/{$payment->id}/release");
        $response->assertStatus(400);

        // Pending submission
        ContentSubmission::factory()->create([
            'campaign_application_id' => $this->application->id,
            'status' => SubmissionStatus::Pending,
        ]);

        $response = $this->actingAs($this->brandUser)->putJson("/api/payments/{$payment->id}/release");
        $response->assertStatus(400);
    }

    public function test_brand_can_release_with_approved_submission()
    {
        $payment = Payment::factory()->create([
            'campaign_application_id' => $this->application->id,
            'amount' => 500,
            'status' => PaymentStatus::InEscrow,
        ]);

        ContentSubmission::factory()->create([
            'campaign_application_id' => $this->application->id,
            'status' => SubmissionStatus::Approved,
        ]);

        $response = $this->actingAs($this->brandUser)->putJson("/api/payments/{$payment->id}/release");
        
        $response->assertStatus(200)
                 ->assertJsonPath('data.status', 'released');
    }

    public function test_influencer_wallet_summary_and_withdrawal()
    {
        // Give influencer two released payments
        Payment::factory()->create([
            'campaign_application_id' => $this->application->id,
            'amount' => 1000,
            'status' => PaymentStatus::Released,
        ]);
        
        $campaign2 = Campaign::factory()->create([
            'brand_profile_id' => $this->brandProfile->id,
            'budget' => 1000,
        ]);

        $app2 = CampaignApplication::factory()->create([
            'campaign_id' => $campaign2->id,
            'influencer_profile_id' => $this->influencerProfile->id,
            'status' => ApplicationStatus::Accepted,
        ]);
        Payment::factory()->create([
            'campaign_application_id' => $app2->id,
            'amount' => 500,
            'status' => PaymentStatus::InEscrow, // pending
        ]);

        $summary = $this->actingAs($this->influencerUser)->getJson("/api/payments/influencer-summary");
        $summary->assertStatus(200)
                ->assertJsonPath('data.total_earned', 1000)
                ->assertJsonPath('data.total_pending', 500)
                ->assertJsonPath('data.available_balance', 1000);

        // Withdraw 600
        $withdraw = $this->actingAs($this->influencerUser)->postJson("/api/payments/withdraw", [
            'amount' => 600
        ]);
        
        $withdraw->assertStatus(201);
        $this->assertDatabaseHas('withdrawals', [
            'influencer_profile_id' => $this->influencerProfile->id,
            'amount' => 600
        ]);

        // Withdraw more than balance (should fail, remaining is 400)
        $withdrawFail = $this->actingAs($this->influencerUser)->postJson("/api/payments/withdraw", [
            'amount' => 500
        ]);
        $withdrawFail->assertStatus(400);
        
        // Summary should update
        $summary2 = $this->actingAs($this->influencerUser)->getJson("/api/payments/influencer-summary");
        $summary2->assertStatus(200)
                 ->assertJsonPath('data.total_withdrawn', 600)
                 ->assertJsonPath('data.available_balance', 400);
    }
}
