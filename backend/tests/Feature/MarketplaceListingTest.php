<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\MarketplaceListing;
use App\Enums\UserRole;

class MarketplaceListingTest extends TestCase
{
    use RefreshDatabase;

    public function test_brand_can_create_listing(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $response = $this->actingAs($brand)->postJson('/api/marketplace/listings', [
            'title' => 'Test Product',
            'description' => 'Test description',
            'category' => 'Tech',
            'platforms' => ['instagram'],
            'what_influencer_receives' => ['Product A'],
            'expected_content' => ['1 Reel'],
            'availability' => 'available',
            'gift_value' => 100,
            'spots_total' => 5,
        ]);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('marketplace_listings', [
            'title' => 'Test Product',
            'brand_profile_id' => $brandProfile->id,
            'availability' => 'available',
        ]);
    }

    public function test_influencer_can_browse_listings(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        MarketplaceListing::factory()->create(['brand_profile_id' => $brandProfile->id, 'availability' => 'available']);
        
        $influencer = User::factory()->create(['role' => UserRole::Influencer]);
        InfluencerProfile::factory()->create(['user_id' => $influencer->id]);

        $response = $this->actingAs($influencer)->getJson('/api/marketplace/listings');

        $response->assertStatus(200)->assertJsonCount(1, 'data');
    }
}
