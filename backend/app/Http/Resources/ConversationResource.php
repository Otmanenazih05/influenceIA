<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Enums\UserRole;

class ConversationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();
        $isBrand = $user->role === UserRole::Brand;

        // Dynamically resolve the "other participant"
        $otherParticipant = null;
        if ($isBrand && $this->relationLoaded('influencerProfile')) {
            $otherParticipant = [
                'id' => $this->influencerProfile->id,
                'name' => $this->influencerProfile->full_name,
                'avatar' => $this->influencerProfile->profile_photo_url,
                'type' => 'influencer',
                'bio' => $this->influencerProfile->bio,
                'city' => $this->influencerProfile->city,
                'country' => $this->influencerProfile->country,
                'niches' => $this->influencerProfile->niches,
                'ai_score' => $this->influencerProfile->ai_score,
            ];
        } elseif (!$isBrand && $this->relationLoaded('brandProfile')) {
            $otherParticipant = [
                'id' => $this->brandProfile->id,
                'name' => $this->brandProfile->company_name,
                'avatar' => $this->brandProfile->logo_url,
                'type' => 'brand',
                'industry' => $this->brandProfile->industry,
                'website' => $this->brandProfile->website,
                'phone' => $this->brandProfile->phone,
                'country' => $this->brandProfile->country,
                'city' => $this->brandProfile->city,
                'description' => $this->brandProfile->description,
            ];
        }

        // Calculate unread count.
        // Unread = messages in this conversation sent by the OTHER person that have no read_at.
        // We will calculate this securely on the fly, or expect it to be loaded via withCount().
        $unreadCount = $this->unread_count ?? 0;
        
        $latestMessage = null;
        if ($this->relationLoaded('messages') && $this->messages->isNotEmpty()) {
            $msg = $this->messages->first();
            $latestMessage = [
                'id' => $msg->id,
                'body' => $msg->body,
                'created_at' => $msg->created_at,
                'is_mine' => $msg->sender_id === $user->id,
            ];
        }

        return [
            'id' => $this->id,
            'campaign_id' => $this->campaign_id,
            'campaign' => new CampaignResource($this->whenLoaded('campaign')),
            'other_participant' => $otherParticipant,
            'latest_message' => $latestMessage,
            'unread_count' => $unreadCount,
            'updated_at' => $this->updated_at,
        ];
    }
}
