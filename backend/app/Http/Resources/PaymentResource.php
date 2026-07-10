<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'campaign_application_id' => $this->campaign_application_id,
            'amount' => $this->amount,
            'status' => $this->status->value,
            'transaction_ref' => $this->transaction_ref,
            'escrowed_at' => $this->escrowed_at,
            'released_at' => $this->released_at,
            'refunded_at' => $this->refunded_at,
            'created_at' => $this->created_at,
            'application' => new ApplicationResource($this->whenLoaded('campaignApplication')),
        ];
    }
}
