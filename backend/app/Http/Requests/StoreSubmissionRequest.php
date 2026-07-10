<?php

namespace App\Http\Requests;

class StoreSubmissionRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'deliverable_label' => ['required', 'string', 'max:255'],
            'content_url' => ['required', 'url', 'max:500'],
        ];
    }
}
