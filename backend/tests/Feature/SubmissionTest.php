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
use App\Enums\UserRole;

class SubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_influencer_can_submit_content(): void
    {
        $influencer = User::factory()->create(['role' => UserRole::Influencer]);
        $influencerProfile = InfluencerProfile::factory()->create(['user_id' => $influencer->id]);

        $application = CampaignApplication::factory()->create([
            'influencer_profile_id' => $influencerProfile->id,
            'status' => 'accepted',
        ]);

        $response = $this->actingAs($influencer)->postJson("/api/applications/{$application->id}/submissions", [
            'deliverable_label' => 'Instagram Reel',
            'content_url' => 'https://instagram.com/reel/1234',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('content_submissions', [
            'campaign_application_id' => $application->id,
            'content_url' => 'https://instagram.com/reel/1234',
            'status' => 'submitted',
        ]);

        $this->assertDatabaseHas('campaign_applications', [
            'id' => $application->id,
            'status' => 'submitted',
        ]);
    }

    public function test_brand_can_review_submission(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $campaign = Campaign::factory()->create(['brand_profile_id' => $brandProfile->id]);
        $application = CampaignApplication::factory()->create(['campaign_id' => $campaign->id]);
        
        $submission = ContentSubmission::factory()->create([
            'campaign_application_id' => $application->id,
            'status' => 'submitted',
        ]);

        $response = $this->actingAs($brand)->putJson("/api/submissions/{$submission->id}", [
            'status' => 'approved',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('content_submissions', [
            'id' => $submission->id,
            'status' => 'approved',
        ]);

        $this->assertDatabaseHas('campaign_applications', [
            'id' => $application->id,
            'status' => 'approved',
        ]);
    }
}
