<?php

namespace Database\Factories;

use App\Models\MarketplaceListing;
use App\Models\InfluencerProfile;
use App\Models\MarketplaceRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarketplaceRequestFactory extends Factory
{
    protected $model = MarketplaceRequest::class;

    public function definition(): array
    {
        return [
            'marketplace_listing_id' => MarketplaceListing::factory(),
            'influencer_profile_id' => InfluencerProfile::factory(),
            'status' => \App\Enums\MarketplaceRequestStatus::Requested,
            'message' => $this->faker->sentence(),
            'requested_at' => now(),
        ];
    }
}
