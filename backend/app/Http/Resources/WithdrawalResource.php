<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawalResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'influencer_profile_id' => $this->influencer_profile_id,
            'amount' => $this->amount,
            'reference_id' => $this->reference_id,
            'created_at' => $this->created_at,
        ];
    }
}
