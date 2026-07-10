<?php

namespace Database\Factories;

use App\Models\CampaignApplication;
use App\Models\ContentSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContentSubmissionFactory extends Factory
{
    protected $model = ContentSubmission::class;

    public function definition(): array
    {
        return [
            'campaign_application_id' => CampaignApplication::factory(),
            'deliverable_label' => 'Instagram Reel',
            'content_url' => $this->faker->url(),
            'status' => \App\Enums\SubmissionStatus::Submitted,
            'submitted_at' => now(),
        ];
    }
}
