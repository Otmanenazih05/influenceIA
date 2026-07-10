<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\InfluencerProfile;
use App\Enums\UserRole;
use App\Enums\Platform;

class SocialAccountTest extends TestCase
{
    use RefreshDatabase;

    public function test_influencer_can_add_social_accounts(): void
    {
        $user = User::factory()->create(['role' => UserRole::Influencer]);
        InfluencerProfile::factory()->create(['user_id' => $user->id]);
        
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
                         ->postJson('/api/auth/social-accounts', [
                             'accounts' => [
                                 [
                                     'platform' => 'instagram',
                                     'handle' => '@john_doe',
                                     'followers_count' => 10000,
                                 ],
                                 [
                                     'platform' => 'tiktok',
                                     'handle' => '@johndoe_tk',
                                     'followers_count' => 50000,
                                 ]
                             ]
                         ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.social_accounts.0.platform', 'instagram');

        $this->assertDatabaseHas('social_accounts', [
            'platform' => 'instagram',
            'handle' => '@john_doe',
        ]);
        
        $this->assertDatabaseHas('social_accounts', [
            'platform' => 'tiktok',
            'handle' => '@johndoe_tk',
        ]);
    }

    public function test_brand_cannot_add_social_accounts(): void
    {
        $user = User::factory()->create(['role' => UserRole::Brand]);
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
                         ->postJson('/api/auth/social-accounts', [
                             'accounts' => [
                                 ['platform' => 'instagram', 'handle' => '@brand']
                             ]
                         ]);

        // Should be forbidden by role middleware
        $response->assertStatus(403);
    }
}
