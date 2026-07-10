<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\InfluencerProfile;

class MatchScoreService
{
    /**
     * Calculates the match score (0-100) between a Campaign and an Influencer.
     * Returns the total score and the breakdown.
     *
     * @param Campaign $campaign
     * @param InfluencerProfile $influencer
     * @return array
     */
    public function calculateMatch(Campaign $campaign, InfluencerProfile $influencer): array
    {
        $breakdown = [
            'total_match_score' => 0,
            'niche_score' => 0,
            'platform_score' => 0,
            'follower_tier_score' => 0,
            'influencer_quality_score' => 0,
        ];

        // 1. Niche Overlap (0-35 points)
        $campaignNiches = array_map('strtolower', $campaign->niches ?? []);
        $influencerNiches = $influencer->niches ?? [];
        $influencerNiches = array_map('trim', array_map('strtolower', $influencerNiches));

        $overlap = count(array_intersect($campaignNiches, $influencerNiches));
        if (count($campaignNiches) > 0) {
            $breakdown['niche_score'] = min(round(($overlap / count($campaignNiches)) * 35), 35);
        } else {
            // If campaign has no specific niches, award full points for flexibility
            $breakdown['niche_score'] = 35;
        }

        // 2. Platform Overlap (0-30 points)
        $campaignPlatforms = $campaign->platforms ?? [];
        $influencerPlatforms = $influencer->socialAccounts->pluck('platform.value')->toArray();
        if (empty($influencerPlatforms)) {
            $influencerPlatforms = $influencer->socialAccounts->pluck('platform')->toArray();
        }
        
        $platformOverlap = count(array_intersect($campaignPlatforms, $influencerPlatforms));
        if (count($campaignPlatforms) > 0) {
            $breakdown['platform_score'] = min(round(($platformOverlap / count($campaignPlatforms)) * 30), 30);
        } else {
            $breakdown['platform_score'] = 30;
        }

        // 3. Follower Tier Match (0-20 points)
        $totalFollowers = 0;
        foreach ($influencer->socialAccounts as $account) {
            $totalFollowers += (int) ($account->followers_count ?? 0);
        }

        // Determine influencer's actual tier
        $actualTier = $this->determineTier($totalFollowers);
        
        // Match against campaign requested tier
        if ($campaign->follower_tier) {
            if ($campaign->follower_tier === $actualTier) {
                $breakdown['follower_tier_score'] = 20; // Perfect match
            } else {
                $breakdown['follower_tier_score'] = 10; // Partial/Acceptable match if they have influence
            }
        } else {
            // Check hard bounds if no tier provided
            $meetsMin = true;
            $meetsMax = true;
            
            if ($campaign->min_followers && $totalFollowers < $campaign->min_followers) {
                $meetsMin = false;
            }
            if ($campaign->max_followers && $totalFollowers > $campaign->max_followers) {
                $meetsMax = false;
            }

            if ($meetsMin && $meetsMax) {
                $breakdown['follower_tier_score'] = 20;
            } elseif (!$meetsMin) {
                $breakdown['follower_tier_score'] = 0;
            } else {
                $breakdown['follower_tier_score'] = 10;
            }
        }

        // 4. Influencer Quality / AI Score Bonus (0-15 points)
        // 15% of their overall AI score is added to the match
        $influencerAiScore = $influencer->ai_score ?? 0;
        $breakdown['influencer_quality_score'] = round(($influencerAiScore / 100) * 15);

        // Total
        $breakdown['total_match_score'] = $breakdown['niche_score'] 
                                        + $breakdown['platform_score'] 
                                        + $breakdown['follower_tier_score'] 
                                        + $breakdown['influencer_quality_score'];

        $breakdown['total_match_score'] = min($breakdown['total_match_score'], 100);

        return $breakdown;
    }

    private function determineTier(int $followers): string
    {
        if ($followers < 10000) return 'nano';
        if ($followers < 100000) return 'micro';
        return 'macro';
    }
}
