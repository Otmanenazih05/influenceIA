<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\InfluencerScoreService;
use App\Services\MatchScoreService;
use App\Models\Campaign;

class AiScoreController extends Controller
{
    protected $influencerScoreService;
    protected $matchScoreService;

    public function __construct(InfluencerScoreService $influencerScoreService, MatchScoreService $matchScoreService)
    {
        $this->influencerScoreService = $influencerScoreService;
        $this->matchScoreService = $matchScoreService;
    }

    /**
     * Get the breakdown of the influencer's AI score.
     */
    public function influencerScoreExplanation(Request $request)
    {
        $profile = $request->user()->influencerProfile;
        
        // Ensure relationships are loaded for accurate calculation
        $profile->load('socialAccounts');
        
        $breakdown = $this->influencerScoreService->calculateScore($profile);

        return response()->json([
            'message' => 'Influencer AI score explanation',
            'data' => $breakdown,
        ]);
    }

    /**
     * Get the breakdown of the match score between the influencer and a campaign.
     */
    public function campaignMatchExplanation(Request $request, $campaignId)
    {
        $campaign = Campaign::findOrFail($campaignId);
        $profile = $request->user()->influencerProfile;
        
        $profile->load('socialAccounts');

        $breakdown = $this->matchScoreService->calculateMatch($campaign, $profile);

        return response()->json([
            'message' => 'Campaign match score explanation',
            'data' => $breakdown,
        ]);
    }
}
