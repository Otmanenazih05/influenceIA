<?php

namespace Database\Factories;

use App\Models\InfluencerProfile;
use App\Models\SocialAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

class SocialAccountFactory extends Factory
{
    protected $model = SocialAccount::class;

    public function definition(): array
    {
        return [
            'influencer_profile_id' => InfluencerProfile::factory(),
            'platform' => $this->faker->randomElement([\App\Enums\Platform::Instagram, \App\Enums\Platform::TikTok, \App\Enums\Platform::YouTube]),
            'handle' => '@'.$this->faker->userName(),
            'profile_url' => $this->faker->url(),
            'followers_count' => $this->faker->numberBetween(1000, 500000),
            'engagement_rate' => $this->faker->randomFloat(2, 1, 15),
            'avg_views' => $this->faker->numberBetween(500, 100000),
            'verified' => $this->faker->boolean(20),
        ];
    }
}
