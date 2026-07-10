<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class MarketplaceListingResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'platforms' => $this->platforms,
            'image_url' => $this->image_url,
            'what_influencer_receives' => $this->what_influencer_receives,
            'expected_content' => $this->expected_content,
            'requirements' => $this->requirements,
            'availability' => $this->availability,
            'gift_value' => $this->gift_value,
            'spots_total' => $this->spots_total,
            'spots_filled' => $this->spots_filled,
            
            // Nested resources
            'brand_profile' => new BrandProfileResource($this->whenLoaded('brandProfile')),
            
            // Appended attributes from Controller queries (counts)
            'requests_count' => $this->whenNotNull($this->requests_count),
            
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
