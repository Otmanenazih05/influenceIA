<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\CampaignType;
use App\Enums\PaymentModel;
use App\Enums\FollowerTier;
use App\Enums\CampaignStatus;

class UpdateCampaignRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'brief' => ['sometimes', 'required', 'string'],
            'brand_color' => ['nullable', 'string', 'max:10'],
            'campaign_type' => ['sometimes', 'required', Rule::enum(CampaignType::class)],
            'payment_model' => ['sometimes', 'required', Rule::enum(PaymentModel::class)],
            'budget' => ['sometimes', 'required', 'integer', 'min:0'],
            'platforms' => ['sometimes', 'required', 'array', 'min:1'],
            'platforms.*' => ['string', Rule::enum(\App\Enums\Platform::class)],
            'niches' => ['nullable', 'array'],
            'niches.*' => ['string'],
            'follower_tier' => ['sometimes', 'required', Rule::enum(FollowerTier::class)],
            'min_followers' => ['sometimes', 'required', 'integer', 'min:0'],
            'max_followers' => ['nullable', 'integer', 'min:0', 'gte:min_followers'],
            'min_engagement_rate' => ['sometimes', 'required', 'numeric', 'min:0', 'max:100'],
            'target_countries' => ['nullable', 'array'],
            'target_countries.*' => ['string'],
            'target_gender' => ['sometimes', 'required', 'string', 'in:all,male,female'],
            'target_age_range' => ['nullable', 'string', 'max:20'],
            'deliverables' => ['nullable', 'array'],
            'deliverables.*' => ['string'],
            'application_deadline' => ['nullable', 'date'],
            'submission_deadline' => ['nullable', 'date'],
            'publication_date' => ['nullable', 'date'],
            'campaign_end' => ['nullable', 'date'],
            'status' => ['sometimes', 'required', Rule::enum(CampaignStatus::class)],
            'spots_total' => ['sometimes', 'required', 'integer', 'min:1'],
        ];
    }
}
