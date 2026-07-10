<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\CampaignType;
use App\Enums\PaymentModel;
use App\Enums\FollowerTier;
use App\Enums\CampaignStatus;

class StoreCampaignRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'brief' => ['required', 'string'],
            'brand_color' => ['nullable', 'string', 'max:10'],
            'campaign_type' => ['required', Rule::enum(CampaignType::class)],
            'payment_model' => ['required', Rule::enum(PaymentModel::class)],
            'budget' => ['required', 'integer', 'min:0'],
            'platforms' => ['required', 'array', 'min:1'],
            'platforms.*' => ['string', Rule::enum(\App\Enums\Platform::class)],
            'niches' => ['nullable', 'array'],
            'niches.*' => ['string'],
            'follower_tier' => ['required', Rule::enum(FollowerTier::class)],
            'min_followers' => ['required', 'integer', 'min:0'],
            'max_followers' => ['nullable', 'integer', 'min:0', 'gte:min_followers'],
            'min_engagement_rate' => ['required', 'numeric', 'min:0', 'max:100'],
            'target_countries' => ['nullable', 'array'],
            'target_countries.*' => ['string'],
            'target_gender' => ['required', 'string', 'in:all,male,female'],
            'target_age_range' => ['nullable', 'string', 'max:20'],
            'deliverables' => ['nullable', 'array'],
            'deliverables.*' => ['string'],
            'application_deadline' => ['nullable', 'date'],
            'submission_deadline' => ['nullable', 'date'],
            'publication_date' => ['nullable', 'date'],
            'campaign_end' => ['nullable', 'date'],
            'status' => ['required', Rule::in([CampaignStatus::Draft->value, CampaignStatus::Active->value])],
            'spots_total' => ['required', 'integer', 'min:1'],
        ];
    }
}
