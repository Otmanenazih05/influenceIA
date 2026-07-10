<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\InfluencerProfile;
use App\Models\CampaignApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignApplicationFactory extends Factory
{
    protected $model = CampaignApplication::class;

    public function definition(): array
    {
        return [
            'campaign_id' => Campaign::factory(),
            'influencer_profile_id' => InfluencerProfile::factory(),
            'status' => \App\Enums\ApplicationStatus::Pending,
            'match_score' => $this->faker->numberBetween(70, 99),
            'cover_message' => $this->faker->paragraph(),
            'applied_at' => now(),
        ];
    }
}
