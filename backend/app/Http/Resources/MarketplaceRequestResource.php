<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class MarketplaceRequestResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'marketplace_listing_id' => $this->marketplace_listing_id,
            'influencer_profile_id' => $this->influencer_profile_id,
            'status' => $this->status,
            'message' => $this->message,
            'requested_at' => $this->requested_at,
            
            // Nested resources depending on the context
            'listing' => new MarketplaceListingResource($this->whenLoaded('listing')),
            'influencer_profile' => new InfluencerProfileResource($this->whenLoaded('influencerProfile')),
            
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
