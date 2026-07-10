<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\Platform;
use App\Enums\MarketplaceListingStatus;

class StoreMarketplaceListingRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category' => ['required', 'string', 'max:100'],
            'platforms' => ['required', 'array', 'min:1'],
            'platforms.*' => ['string', Rule::enum(Platform::class)],
            'image_url' => ['nullable', 'url', 'max:500'],
            'what_influencer_receives' => ['required', 'array', 'min:1'],
            'what_influencer_receives.*' => ['string'],
            'expected_content' => ['required', 'array', 'min:1'],
            'expected_content.*' => ['string'],
            'requirements' => ['nullable', 'array'],
            'requirements.*' => ['string'],
            'availability' => ['required', Rule::enum(MarketplaceListingStatus::class)],
            'gift_value' => ['required', 'integer', 'min:0'],
            'spots_total' => ['required', 'integer', 'min:1'],
            'spots_filled' => ['nullable', 'integer', 'min:0', 'lte:spots_total'],
        ];
    }
}
