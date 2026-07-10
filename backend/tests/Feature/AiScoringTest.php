<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\InfluencerProfile;
use App\Models\BrandProfile;
use App\Models\Campaign;
use App\Models\SocialAccount;
use App\Enums\UserRole;

class AiScoringTest extends TestCase
{
    use RefreshDatabase;

    public function test_adding_social_account_updates_ai_score(): void
    {
        $user = User::factory()->create(['role' => UserRole::Influencer]);
        $profile = InfluencerProfile::factory()->create([
            'user_id' => $user->id,
            'bio' => 'Test bio',
            'gender' => 'female',
            'niches' => ['Beauty', 'Fashion'],
            'ai_score' => 0,
        ]);

        $this->assertEquals(0, $profile->ai_score);

        $response = $this->actingAs($user)->postJson('/api/auth/social-accounts', [
            'accounts' => [
                [
                    'platform' => 'instagram',
                    'handle' => '@test_influencer',
                    'profile_url' => 'https://instagram.com/test_influencer',
                    'followers_count' => 50000,
                    'engagement_rate' => 6.5,
                ]
            ]
        ]);

        $response->assertStatus(200);

        $profile->refresh();
        $this->assertGreaterThan(0, $profile->ai_score);
        $this->assertGreaterThan(0, $profile->profile_completeness);
    }

    public function test_influencer_can_get_score_explanation(): void
    {
        $user = User::factory()->create(['role' => UserRole::Influencer]);
        $profile = InfluencerProfile::factory()->create([
            'user_id' => $user->id,
            'bio' => 'Test bio',
            'ai_score' => 50,
        ]);

        SocialAccount::factory()->create([
            'influencer_profile_id' => $profile->id,
            'platform' => 'instagram',
            'engagement_rate' => 3.2
        ]);

        $response = $this->actingAs($user)->getJson('/api/influencer/score-explanation');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'data' => [
                         'total_score',
                         'variance_score',
                         'completeness_score',
                         'connections_score',
                         'engagement_score',
                         'profile_completeness_percentage',
                     ]
                 ]);
    }

    public function test_influencer_can_get_match_explanation(): void
    {
        $user = User::factory()->create(['role' => UserRole::Influencer]);
        $profile = InfluencerProfile::factory()->create([
            'user_id' => $user->id,
            'niches' => ['Tech'],
            'ai_score' => 80,
        ]);

        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $campaign = Campaign::factory()->create([
            'brand_profile_id' => $brandProfile->id,
            'niches' => ['Tech', 'Gaming'],
            'platforms' => ['youtube'],
        ]);

        $response = $this->actingAs($user)->getJson("/api/campaigns/{$campaign->id}/match-explanation");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'data' => [
                         'total_match_score',
                         'niche_score',
                         'platform_score',
                         'follower_tier_score',
                         'influencer_quality_score',
                     ]
                 ]);
    }
}
