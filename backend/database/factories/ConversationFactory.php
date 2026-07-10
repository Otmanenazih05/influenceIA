<?php

namespace Database\Factories;

use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    protected $model = Conversation::class;

    public function definition(): array
    {
        return [
            'brand_profile_id' => BrandProfile::factory(),
            'influencer_profile_id' => InfluencerProfile::factory(),
            'campaign_id' => null, // Optionally set via state
        ];
    }
}
