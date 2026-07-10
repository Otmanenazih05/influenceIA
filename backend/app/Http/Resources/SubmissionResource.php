<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class SubmissionResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'campaign_application_id' => $this->campaign_application_id,
            'deliverable_label' => $this->deliverable_label,
            'content_url' => $this->content_url,
            'status' => $this->status,
            'revision_note' => $this->revision_note,
            'submitted_at' => $this->submitted_at,
            'reviewed_at' => $this->reviewed_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
