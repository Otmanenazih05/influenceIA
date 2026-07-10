<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class UserResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            // Conditionally load the appropriate profile based on role, if loaded
            'influencer_profile' => new InfluencerProfileResource($this->whenLoaded('influencerProfile')),
            'brand_profile' => new BrandProfileResource($this->whenLoaded('brandProfile')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
