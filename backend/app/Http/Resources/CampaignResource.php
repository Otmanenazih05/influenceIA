<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class CampaignResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'brief' => $this->brief,
            'brand_color' => $this->brand_color,
            'campaign_type' => $this->campaign_type,
            'payment_model' => $this->payment_model,
            'budget' => $this->budget,
            'platforms' => $this->platforms,
            'niches' => $this->niches,
            'follower_tier' => $this->follower_tier,
            'min_followers' => $this->min_followers,
            'max_followers' => $this->max_followers,
            'min_engagement_rate' => $this->min_engagement_rate,
            'target_countries' => $this->target_countries,
            'target_gender' => $this->target_gender,
            'target_age_range' => $this->target_age_range,
            'deliverables' => $this->deliverables,
            'application_deadline' => $this->application_deadline,
            'submission_deadline' => $this->submission_deadline,
            'publication_date' => $this->publication_date,
            'campaign_end' => $this->campaign_end,
            'status' => $this->status,
            'spots_total' => $this->spots_total,
            'spots_filled' => $this->spots_filled,
            'brand_profile' => new BrandProfileResource($this->whenLoaded('brandProfile')),
            
            // Appended attributes from Controller queries (counts & score)
            'applicants_count' => $this->whenNotNull($this->applicants_count),
            'accepted_count' => $this->whenNotNull($this->accepted_count),
            'pending_approvals_count' => $this->whenNotNull($this->pending_approvals_count),
            'match_score' => $this->whenNotNull($this->match_score),

            // Escrow details
            'payment_escrowed' => (function () {
                $sum = 0;
                if ($this->relationLoaded('applications')) {
                    foreach ($this->applications as $app) {
                        if ($app->relationLoaded('payment') && $app->payment) {
                            if (in_array($app->payment->status->value, ['in_escrow', 'released'])) {
                                $sum += (int) $app->payment->amount;
                            }
                        }
                    }
                }
                return $sum;
            })(),
            'payment_released' => (function () {
                $sum = 0;
                if ($this->relationLoaded('applications')) {
                    foreach ($this->applications as $app) {
                        if ($app->relationLoaded('payment') && $app->payment) {
                            if ($app->payment->status->value === 'released') {
                                $sum += (int) $app->payment->amount;
                            }
                        }
                    }
                }
                return $sum;
            })(),
            'payment_pending' => (function () {
                $sum = 0;
                if ($this->relationLoaded('applications')) {
                    foreach ($this->applications as $app) {
                        if ($app->relationLoaded('payment') && $app->payment) {
                            if ($app->payment->status->value === 'in_escrow') {
                                $sum += (int) $app->payment->amount;
                            }
                        }
                    }
                }
                return $sum;
            })(),
            
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
