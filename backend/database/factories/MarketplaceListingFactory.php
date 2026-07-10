<?php

namespace Database\Factories;

use App\Models\BrandProfile;
use App\Models\MarketplaceListing;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarketplaceListingFactory extends Factory
{
    protected $model = MarketplaceListing::class;

    public function definition(): array
    {
        return [
            'brand_profile_id' => BrandProfile::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'category' => $this->faker->randomElement(['Beauty', 'Fashion', 'Wellness', 'Tech', 'Home']),
            'platforms' => ['instagram'],
            'image_url' => $this->faker->imageUrl(),
            'what_influencer_receives' => ['Product sample'],
            'expected_content' => ['1 Instagram Post'],
            'requirements' => ['1K+ followers'],
            'availability' => \App\Enums\MarketplaceListingStatus::Available,
            'gift_value' => $this->faker->numberBetween(100, 1500),
            'spots_total' => 10,
            'spots_filled' => 0,
        ];
    }
}
