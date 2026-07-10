<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\InfluencerProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class InfluencerProfileFactory extends Factory
{
    protected $model = InfluencerProfile::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => \App\Enums\UserRole::Influencer]),
            'full_name' => $this->faker->name(),
            'bio' => $this->faker->sentence(),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'country' => 'Morocco',
            'city' => $this->faker->randomElement(['Casablanca', 'Rabat', 'Marrakech', 'Tangier']),
            'phone' => $this->faker->phoneNumber(),
            'niches' => $this->faker->randomElements(['Beauty & Skincare', 'Lifestyle', 'Fashion & Style', 'Fitness & Health', 'Tech & Productivity'], 2),
            'profile_photo_url' => 'https://i.pravatar.cc/150?u='.$this->faker->uuid(),
            'ai_score' => $this->faker->numberBetween(50, 99),
            'profile_completeness' => $this->faker->numberBetween(60, 100),
            'age_confirmed' => true,
            'terms_accepted' => true,
        ];
    }
}
