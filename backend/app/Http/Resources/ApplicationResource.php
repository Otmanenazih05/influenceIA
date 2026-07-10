<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class ApplicationResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'campaign_id' => $this->campaign_id,
            'influencer_profile_id' => $this->influencer_profile_id,
            'status' => $this->status instanceof \BackedEnum ? $this->status->value : $this->status,
            'match_score' => $this->match_score,
            'cover_message' => $this->cover_message,
            'applied_at' => $this->applied_at,
            'accepted_at' => $this->accepted_at,
            'completed_at' => $this->completed_at,
            
            // Nested resources
            'campaign' => new CampaignResource($this->whenLoaded('campaign')),
            'influencer_profile' => new InfluencerProfileResource($this->whenLoaded('influencerProfile')),
            'content_submissions' => SubmissionResource::collection($this->whenLoaded('contentSubmissions')),
            'payment' => new PaymentResource($this->whenLoaded('payment')),
        ];
    }
}
