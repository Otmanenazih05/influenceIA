<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use App\Enums\SubmissionStatus;

class ReviewSubmissionRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'status' => ['required', Rule::in([
                SubmissionStatus::Approved->value,
                SubmissionStatus::RevisionRequested->value
            ])],
            'revision_note' => ['required_if:status,' . SubmissionStatus::RevisionRequested->value, 'string'],
        ];
    }
}
