<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Http\Resources\CampaignResource;
use App\Enums\UserRole;
use App\Enums\CampaignStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    /**
     * Influencer browsing all active campaigns.
     */
    public function index(Request $request)
    {
        $query = Campaign::with('brandProfile')
            ->where('status', CampaignStatus::Active->value);

        // Filters
        if ($request->filled('platform')) {
            $query->whereJsonContains('platforms', $request->platform);
        }
        if ($request->filled('budget_min')) {
            $query->where('budget', '>=', $request->budget_min);
        }
        if ($request->filled('country')) {
            $query->whereJsonContains('target_countries', $request->country);
        }

        $campaigns = $query->paginate(1000);
        $influencerProfile = $request->user()->influencerProfile;
        $matchScoreService = app(\App\Services\MatchScoreService::class);

        // Calculate AI match score
        $campaigns->getCollection()->transform(function ($campaign) use ($influencerProfile, $matchScoreService) {
            $breakdown = $matchScoreService->calculateMatch($campaign, $influencerProfile);
            $campaign->match_score = $breakdown['total_match_score'];
            return $campaign;
        });

        return CampaignResource::collection($campaigns);
    }

    /**
     * Brand viewing their own campaigns with stats.
     */
    public function mine(Request $request)
    {
        $brandId = $request->user()->brandProfile->id;

        $campaigns = Campaign::where('brand_profile_id', $brandId)
            ->with(['applications.payment'])
            ->withCount([
                'applications as applicants_count',
                'applications as accepted_count' => function ($query) {
                    $query->whereIn('status', [
                        \App\Enums\ApplicationStatus::Accepted->value,
                        \App\Enums\ApplicationStatus::Submitted->value,
                        \App\Enums\ApplicationStatus::Revision->value,
                        \App\Enums\ApplicationStatus::Approved->value,
                        \App\Enums\ApplicationStatus::Completed->value,
                    ]);
                },
                'applications as pending_approvals_count' => function ($query) {
                    $query->where('status', \App\Enums\ApplicationStatus::Submitted->value); // Content submitted, waiting for brand approval
                }
            ])
            ->paginate(1000);

        return CampaignResource::collection($campaigns);
    }

    /**
     * Store a newly created campaign.
     */
    public function store(StoreCampaignRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['brand_profile_id'] = $request->user()->brandProfile->id;

        $campaign = Campaign::create($validated);

        return response()->json([
            'message' => 'Campaign created successfully.',
            'data' => new CampaignResource($campaign),
        ], 201);
    }

    /**
     * Display a specific campaign.
     */
    public function show(Request $request, $id)
    {
        $campaign = Campaign::with(['brandProfile', 'applications.payment'])
            ->withCount([
                'applications as applicants_count',
                'applications as accepted_count' => function ($query) {
                    $query->whereIn('status', [
                        \App\Enums\ApplicationStatus::Accepted->value,
                        \App\Enums\ApplicationStatus::Submitted->value,
                        \App\Enums\ApplicationStatus::Revision->value,
                        \App\Enums\ApplicationStatus::Approved->value,
                        \App\Enums\ApplicationStatus::Completed->value,
                    ]);
                },
                'applications as pending_approvals_count' => function ($query) {
                    $query->where('status', \App\Enums\ApplicationStatus::Submitted->value);
                },
            ])
            ->findOrFail($id);

        $user = $request->user();

        // If influencer, campaign must be active, OR they must have applied/collaborated on it
        if ($user->role === UserRole::Influencer) {
            $hasApplied = \App\Models\CampaignApplication::where('campaign_id', $campaign->id)
                ->where('influencer_profile_id', $user->influencerProfile->id)
                ->exists();

            if (!$hasApplied && !in_array($campaign->status, [CampaignStatus::Active, CampaignStatus::Reviewing])) {
                return response()->json(['message' => 'Campaign not active.'], 403);
            }
        }

        // If brand, must own the campaign
        if ($user->role === UserRole::Brand && $campaign->brand_profile_id !== $user->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        return new CampaignResource($campaign);
    }

    /**
     * Update the campaign.
     */
    public function update(UpdateCampaignRequest $request, $id): JsonResponse
    {
        $campaign = Campaign::findOrFail($id);

        if ($campaign->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $campaign->update($request->validated());

        return response()->json([
            'message' => 'Campaign updated successfully.',
            'data' => new CampaignResource($campaign),
        ]);
    }

    /**
     * Delete the campaign.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $campaign = Campaign::findOrFail($id);

        if ($campaign->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $campaign->delete();

        return response()->json([
            'message' => 'Campaign deleted successfully.'
        ]);
    }
}
