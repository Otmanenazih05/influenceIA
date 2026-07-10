<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\Campaign;
use App\Models\CampaignApplication;
use App\Enums\UserRole;

class ApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_influencer_can_apply_to_active_campaign(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $campaign = Campaign::factory()->create(['brand_profile_id' => $brandProfile->id, 'status' => 'active']);

        $influencer = User::factory()->create(['role' => UserRole::Influencer]);
        $influencerProfile = InfluencerProfile::factory()->create(['user_id' => $influencer->id]);

        $response = $this->actingAs($influencer)->postJson("/api/campaigns/{$campaign->id}/apply", [
            'cover_message' => 'I would love to work with you!',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('campaign_applications', [
            'campaign_id' => $campaign->id,
            'influencer_profile_id' => $influencerProfile->id,
            'status' => 'pending',
        ]);
    }

    public function test_influencer_cannot_apply_twice(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $campaign = Campaign::factory()->create(['brand_profile_id' => $brandProfile->id, 'status' => 'active']);

        $influencer = User::factory()->create(['role' => UserRole::Influencer]);
        $influencerProfile = InfluencerProfile::factory()->create(['user_id' => $influencer->id]);

        CampaignApplication::factory()->create([
            'campaign_id' => $campaign->id,
            'influencer_profile_id' => $influencerProfile->id,
        ]);

        $response = $this->actingAs($influencer)->postJson("/api/campaigns/{$campaign->id}/apply");

        $response->assertStatus(409); // Conflict
    }

    public function test_brand_can_accept_application(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $campaign = Campaign::factory()->create(['brand_profile_id' => $brandProfile->id, 'status' => 'active']);

        $application = CampaignApplication::factory()->create([
            'campaign_id' => $campaign->id,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($brand)->putJson("/api/campaigns/{$campaign->id}/applications/{$application->id}", [
            'status' => 'accepted',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('campaign_applications', [
            'id' => $application->id,
            'status' => 'accepted',
        ]);
    }
}
