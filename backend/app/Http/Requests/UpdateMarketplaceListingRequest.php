<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\Platform;
use App\Enums\MarketplaceListingStatus;

class UpdateMarketplaceListingRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'category' => ['sometimes', 'required', 'string', 'max:100'],
            'platforms' => ['sometimes', 'required', 'array', 'min:1'],
            'platforms.*' => ['string', Rule::enum(Platform::class)],
            'image_url' => ['nullable', 'url', 'max:500'],
            'what_influencer_receives' => ['sometimes', 'required', 'array', 'min:1'],
            'what_influencer_receives.*' => ['string'],
            'expected_content' => ['sometimes', 'required', 'array', 'min:1'],
            'expected_content.*' => ['string'],
            'requirements' => ['nullable', 'array'],
            'requirements.*' => ['string'],
            'availability' => ['sometimes', 'required', Rule::enum(MarketplaceListingStatus::class)],
            'gift_value' => ['sometimes', 'required', 'integer', 'min:0'],
            'spots_total' => ['sometimes', 'required', 'integer', 'min:1'],
            'spots_filled' => ['sometimes', 'required', 'integer', 'min:0'], // Validation for spots_total is trickier with partial updates, letting it pass basic type check
        ];
    }
}
