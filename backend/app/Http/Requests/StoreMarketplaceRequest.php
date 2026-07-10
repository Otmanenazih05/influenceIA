<?php

namespace App\Http\Requests;

class StoreMarketplaceRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'message' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
