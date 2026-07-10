<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class SocialAccountResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'platform' => $this->platform,
            'handle' => $this->handle,
            'profile_url' => $this->profile_url,
            'followers_count' => $this->followers_count,
            'engagement_rate' => $this->engagement_rate,
            'avg_views' => $this->avg_views,
            'verified' => $this->verified,
        ];
    }
}
