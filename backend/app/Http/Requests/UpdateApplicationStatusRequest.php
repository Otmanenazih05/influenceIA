<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\ApplicationStatus;

class UpdateApplicationStatusRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            // Brands can only move application to accepted or rejected directly
            'status' => ['required', Rule::in([
                ApplicationStatus::Accepted->value, 
                ApplicationStatus::Rejected->value
            ])],
        ];
    }
}
