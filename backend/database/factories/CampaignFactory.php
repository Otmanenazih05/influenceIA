<?php

namespace Database\Factories;

use App\Models\BrandProfile;
use App\Models\Campaign;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition(): array
    {
        return [
            'brand_profile_id' => BrandProfile::factory(),
            'title' => $this->faker->sentence(4),
            'brief' => $this->faker->paragraph(3),
            'brand_color' => $this->faker->hexColor(),
            'campaign_type' => $this->faker->randomElement([\App\Enums\CampaignType::Paid, \App\Enums\CampaignType::Gifted]),
            'payment_model' => $this->faker->randomElement([\App\Enums\PaymentModel::Fixed, \App\Enums\PaymentModel::Gifted]),
            'budget' => $this->faker->numberBetween(1000, 20000),
            'platforms' => $this->faker->randomElements(['instagram', 'tiktok'], $this->faker->numberBetween(1, 2)),
            'niches' => $this->faker->randomElements(['Beauty & Skincare', 'Fashion & Style', 'Lifestyle'], $this->faker->numberBetween(1, 2)),
            'follower_tier' => $this->faker->randomElement([\App\Enums\FollowerTier::Micro, \App\Enums\FollowerTier::Any]),
            'min_followers' => 5000,
            'max_followers' => null,
            'min_engagement_rate' => 2.5,
            'target_countries' => ['Morocco'],
            'target_gender' => 'all',
            'deliverables' => ['1 Instagram Reel', '2 Instagram Stories'],
            'application_deadline' => now()->addDays(7),
            'submission_deadline' => now()->addDays(21),
            'publication_date' => now()->addDays(25),
            'campaign_end' => now()->addDays(30),
            'status' => \App\Enums\CampaignStatus::Active,
            'spots_total' => $this->faker->numberBetween(1, 10),
            'spots_filled' => 0,
        ];
    }
}
