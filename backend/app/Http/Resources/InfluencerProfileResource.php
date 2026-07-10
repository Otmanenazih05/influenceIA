<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class InfluencerProfileResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'full_name' => $this->full_name,
            'bio' => $this->bio,
            'gender' => $this->gender,
            'country' => $this->country,
            'city' => $this->city,
            'phone' => $this->phone,
            'niches' => $this->niches,
            'profile_photo_url' => $this->profile_photo_url,
            'ai_score' => $this->ai_score,
            'profile_completeness' => $this->profile_completeness,
            'age_confirmed' => $this->age_confirmed,
            'terms_accepted' => $this->terms_accepted,
            'social_accounts' => SocialAccountResource::collection($this->whenLoaded('socialAccounts')),
        ];
    }
}
