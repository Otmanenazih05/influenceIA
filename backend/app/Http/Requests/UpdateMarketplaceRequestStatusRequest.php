<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\MarketplaceRequestStatus;

class UpdateMarketplaceRequestStatusRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'status' => ['required', Rule::in([
                MarketplaceRequestStatus::Approved->value,
                MarketplaceRequestStatus::Declined->value,
                MarketplaceRequestStatus::Fulfilled->value,
            ])],
        ];
    }
}
