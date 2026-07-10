<?php

namespace App\Http\Requests;

class ApplyToCampaignRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'cover_message' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
