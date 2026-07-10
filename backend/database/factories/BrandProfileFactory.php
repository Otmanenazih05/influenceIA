<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\BrandProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class BrandProfileFactory extends Factory
{
    protected $model = BrandProfile::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(['role' => \App\Enums\UserRole::Brand]),
            'company_name' => $this->faker->company(),
            'contact_name' => $this->faker->name(),
            'industry' => $this->faker->randomElement(['Beauty & Cosmetics', 'Fashion & Apparel', 'Tech & Software', 'Food & Beverage']),
            'website' => $this->faker->url(),
            'phone' => $this->faker->phoneNumber(),
            'logo_url' => 'https://ui-avatars.com/api/?name='.urlencode($this->faker->company()),
            'country' => 'Morocco',
            'city' => $this->faker->randomElement(['Casablanca', 'Rabat', 'Marrakech', 'Tangier']),
        ];
    }
}
