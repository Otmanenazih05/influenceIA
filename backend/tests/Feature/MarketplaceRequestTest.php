<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\MarketplaceListing;
use App\Models\MarketplaceRequest;
use App\Enums\UserRole;

class MarketplaceRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_influencer_can_request_listing(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $listing = MarketplaceListing::factory()->create(['brand_profile_id' => $brandProfile->id, 'availability' => 'available']);
        
        $influencer = User::factory()->create(['role' => UserRole::Influencer]);
        $influencerProfile = InfluencerProfile::factory()->create(['user_id' => $influencer->id]);

        $response = $this->actingAs($influencer)->postJson("/api/marketplace/listings/{$listing->id}/request", [
            'message' => 'I would love to try this product.',
        ]);

        $response->assertStatus(201);
        
        $this->assertDatabaseHas('marketplace_requests', [
            'marketplace_listing_id' => $listing->id,
            'influencer_profile_id' => $influencerProfile->id,
            'status' => 'requested',
        ]);
    }

    public function test_brand_can_approve_request(): void
    {
        $brand = User::factory()->create(['role' => UserRole::Brand]);
        $brandProfile = BrandProfile::factory()->create(['user_id' => $brand->id]);

        $listing = MarketplaceListing::factory()->create(['brand_profile_id' => $brandProfile->id]);
        
        $influencerProfile = InfluencerProfile::factory()->create();
        
        $request = MarketplaceRequest::factory()->create([
            'marketplace_listing_id' => $listing->id,
            'influencer_profile_id' => $influencerProfile->id,
            'status' => 'requested'
        ]);

        $response = $this->actingAs($brand)->putJson("/api/marketplace/requests/{$request->id}", [
            'status' => 'approved',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('marketplace_requests', [
            'id' => $request->id,
            'status' => 'approved',
        ]);
    }
}
