<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\Campaign;
use App\Enums\UserRole;

class CampaignTest extends TestCase
{
    use RefreshDatabase;

    public function test_brand_can_create_campaign(): void
    {
        $user = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->postJson('/api/campaigns', [
            'title' => 'Test Campaign',
            'brief' => 'This is a test.',
            'campaign_type' => 'paid',
            'payment_model' => 'fixed',
            'budget' => 5000,
            'platforms' => ['instagram'],
            'follower_tier' => 'micro',
            'min_followers' => 10000,
            'min_engagement_rate' => 2.5,
            'target_gender' => 'all',
            'status' => 'active',
            'spots_total' => 5,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'Test Campaign');

        $this->assertDatabaseHas('campaigns', [
            'title' => 'Test Campaign',
            'brand_profile_id' => $brandProfile->id,
        ]);
    }

    public function test_influencer_can_browse_active_campaigns(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        Campaign::factory()->create(['brand_profile_id' => $brandProfile->id, 'status' => 'active', 'title' => 'Active 1']);
        Campaign::factory()->create(['brand_profile_id' => $brandProfile->id, 'status' => 'draft', 'title' => 'Draft 1']);

        $influencer = User::factory()->create(['role' => UserRole::Influencer]);
        InfluencerProfile::factory()->create(['user_id' => $influencer->id]);

        $response = $this->actingAs($influencer)->getJson('/api/campaigns');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data')
                 ->assertJsonPath('data.0.title', 'Active 1');
    }

    public function test_brand_cannot_browse_campaigns_like_influencer(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        BrandProfile::factory()->create(['user_id' => $brand->id]);

        $response = $this->actingAs($brand)->getJson('/api/campaigns');

        $response->assertStatus(403);
    }
}
