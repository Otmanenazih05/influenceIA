<?php

namespace App\Http\Requests;

class RegisterBrandRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'company_name' => ['required', 'string', 'max:255'],
            'contact_name' => ['nullable', 'string', 'max:255'],
            'industry' => ['nullable', 'string', 'max:100'],
            'website' => ['nullable', 'string', 'url', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
        ];
    }
}
