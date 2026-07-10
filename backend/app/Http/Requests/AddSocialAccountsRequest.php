<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\Platform;

class AddSocialAccountsRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            // The payload must contain an 'accounts' array
            'accounts' => ['required', 'array', 'min:1'],
            'accounts.*.platform' => ['required', 'string', Rule::enum(Platform::class)],
            'accounts.*.handle' => ['required', 'string', 'max:100'],
            'accounts.*.profile_url' => ['nullable', 'url', 'max:255'],
            'accounts.*.followers_count' => ['nullable', 'integer', 'min:0'],
            'accounts.*.engagement_rate' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'accounts.*.avg_views' => ['nullable', 'integer', 'min:0'],
            'accounts.*.verified' => ['nullable', 'boolean'],
        ];
    }
}
