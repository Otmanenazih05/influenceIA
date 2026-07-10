<?php

namespace App\Http\Requests;

class RegisterInfluencerRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'full_name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:20'],
            'country' => ['nullable', 'string', 'max:100'],
            'city' => ['nullable', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:30'],
            // Age and legal consent validations per brief
            'age_confirmed' => ['required', 'boolean', 'accepted'], // Must be true
            'terms_accepted' => ['required', 'boolean', 'accepted'], // Must be true
        ];
    }
}
