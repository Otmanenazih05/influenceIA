<?php

namespace Database\Factories;

use App\Models\CampaignApplication;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'campaign_application_id' => CampaignApplication::factory(),
            'amount' => $this->faker->numberBetween(500, 15000),
            'status' => \App\Enums\PaymentStatus::Pending,
        ];
    }
}
