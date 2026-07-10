<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StartConversationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // We'll authorize inside the controller based on role
    }

    public function rules(): array
    {
        return [
            'target_user_id' => 'required|exists:users,id',
            'campaign_id' => 'nullable|exists:campaigns,id',
        ];
    }
}
