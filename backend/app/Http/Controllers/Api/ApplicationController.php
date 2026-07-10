<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\CampaignApplication;
use App\Http\Requests\ApplyToCampaignRequest;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Http\Resources\ApplicationResource;
use App\Enums\UserRole;
use App\Enums\ApplicationStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    /**
     * Brand viewing applications for a specific campaign.
     */
    public function indexForCampaign(Request $request, $campaignId)
    {
        $campaign = Campaign::findOrFail($campaignId);

        if ($campaign->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $query = CampaignApplication::with(['influencerProfile.socialAccounts', 'contentSubmissions', 'payment'])
            ->where('campaign_id', $campaignId);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return ApplicationResource::collection($query->paginate(1000));
    }

    /**
     * Influencer viewing their own applications.
     */
    public function mine(Request $request)
    {
        $influencerId = $request->user()->influencerProfile->id;

        $applications = CampaignApplication::with(['campaign.brandProfile', 'contentSubmissions', 'payment'])
            ->where('influencer_profile_id', $influencerId)
            ->paginate(1000);

        return ApplicationResource::collection($applications);
    }

    /**
     * View a single application's detail.
     */
    public function show(Request $request, $id)
    {
        $application = CampaignApplication::with(['campaign.brandProfile', 'influencerProfile', 'contentSubmissions', 'payment'])
            ->findOrFail($id);

        $user = $request->user();

        // Influencer can only view their own
        if ($user->role === UserRole::Influencer && $application->influencer_profile_id !== $user->influencerProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // Brand can only view applications for their campaigns
        if ($user->role === UserRole::Brand && $application->campaign->brand_profile_id !== $user->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return new ApplicationResource($application);
    }

    /**
     * Influencer applying to a campaign.
     */
    public function store(ApplyToCampaignRequest $request, $campaignId): JsonResponse
    {
        $campaign = Campaign::findOrFail($campaignId);
        $influencerId = $request->user()->influencerProfile->id;

        if ($campaign->status->value !== \App\Enums\CampaignStatus::Active->value) {
            return response()->json(['message' => 'Campaign is not active.'], 400);
        }

        if (CampaignApplication::where('campaign_id', $campaignId)->where('influencer_profile_id', $influencerId)->exists()) {
            return response()->json(['message' => 'Already applied to this campaign.'], 409);
        }

        $matchScoreService = app(\App\Services\MatchScoreService::class);
        $influencerProfile = clone $request->user()->influencerProfile;
        $influencerProfile->loadMissing('socialAccounts');
        
        $breakdown = $matchScoreService->calculateMatch($campaign, $influencerProfile);

        $application = CampaignApplication::create([
            'campaign_id' => $campaignId,
            'influencer_profile_id' => $influencerId,
            'status' => ApplicationStatus::Pending,
            'cover_message' => $request->cover_message,
            'match_score' => $breakdown['total_match_score'],
            'applied_at' => now(),
        ]);

        if (!empty($request->cover_message)) {
            // Check if conversation already exists
            $conversation = \App\Models\Conversation::firstOrCreate([
                'campaign_id' => $campaignId,
                'influencer_profile_id' => $influencerId,
                'brand_profile_id' => $campaign->brand_profile_id,
            ]);

            \App\Models\Message::create([
                'conversation_id' => $conversation->id,
                'sender_id' => $request->user()->id,
                'body' => $request->cover_message,
            ]);
        }

        return response()->json([
            'message' => 'Applied successfully.',
            'data' => new ApplicationResource($application),
        ], 201);
    }

    /**
     * Brand updating application status (accept/reject).
     */
    public function updateStatus(UpdateApplicationStatusRequest $request, $campaignId, $applicationId): JsonResponse
    {
        $campaign = Campaign::findOrFail($campaignId);
        
        if ($campaign->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $application = CampaignApplication::where('campaign_id', $campaignId)->findOrFail($applicationId);

        $status = ApplicationStatus::from($request->status);

        $application->update([
            'status' => $status,
            'accepted_at' => $status === ApplicationStatus::Accepted ? now() : $application->accepted_at,
        ]);

        if ($status === ApplicationStatus::Accepted) {
            \App\Models\Conversation::firstOrCreate([
                'campaign_id' => $campaignId,
                'influencer_profile_id' => $application->influencer_profile_id,
                'brand_profile_id' => $campaign->brand_profile_id,
            ]);
        }

        return response()->json([
            'message' => 'Application status updated.',
            'data' => new ApplicationResource($application),
        ]);
    }

    /**
     * Brand inviting an influencer to a campaign.
     */
    public function invite(Request $request, $campaignId, $influencerId): JsonResponse
    {
        $campaign = Campaign::findOrFail($campaignId);
        
        if ($campaign->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($campaign->status->value !== \App\Enums\CampaignStatus::Active->value) {
            return response()->json(['message' => 'Campaign is not active.'], 400);
        }

        if (CampaignApplication::where('campaign_id', $campaignId)->where('influencer_profile_id', $influencerId)->exists()) {
            return response()->json(['message' => 'Influencer has already applied or been invited.'], 409);
        }

        $influencerProfile = \App\Models\InfluencerProfile::findOrFail($influencerId);
        
        $matchScoreService = app(\App\Services\MatchScoreService::class);
        $influencerProfile->loadMissing('socialAccounts');
        $breakdown = $matchScoreService->calculateMatch($campaign, $influencerProfile);

        $application = CampaignApplication::create([
            'campaign_id' => $campaignId,
            'influencer_profile_id' => $influencerId,
            'status' => ApplicationStatus::Pending,
            'cover_message' => 'Invited by brand',
            'match_score' => $breakdown['total_match_score'],
            'applied_at' => now(),
        ]);

        return response()->json([
            'message' => 'Invited successfully.',
            'data' => new ApplicationResource($application),
        ], 201);
    }
}
