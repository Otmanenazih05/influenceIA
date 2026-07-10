<?php

namespace App\Services;

use App\Models\InfluencerProfile;
use Illuminate\Support\Facades\Log;

class InfluencerScoreService
{
    /**
     * Calculates the overall AI score and profile completeness for an influencer.
     * Updates the database record and returns the detailed breakdown.
     *
     * @param InfluencerProfile $profile
     * @return array
     */
    public function calculateScore(InfluencerProfile $profile): array
    {
        $breakdown = [
            'total_score' => 0,
            'variance_score' => 0,
            'completeness_score' => 0,
            'connections_score' => 0,
            'engagement_score' => 0,
            'profile_completeness_percentage' => 0,
        ];

        // 1. Variance (0-5 points): Deterministic based on ID to avoid robotic identical scores
        $breakdown['variance_score'] = ($profile->id * 7) % 6; // results in 0 to 5

        // 2. Profile Completeness (0-20 points) & Percentage
        // Checks: bio, gender, city, country, niches, phone, profile_photo_url
        $fields = ['bio', 'gender', 'city', 'country', 'phone', 'profile_photo_url'];
        $filledFields = 0;
        
        foreach ($fields as $field) {
            if (!empty($profile->{$field})) {
                $filledFields++;
            }
        }
        
        // Count niches (array)
        if (!empty($profile->niches) && count($profile->niches) > 0) {
            $filledFields++;
        }

        $totalFields = count($fields) + 1; // +1 for niches
        $breakdown['profile_completeness_percentage'] = round(($filledFields / $totalFields) * 100);
        $breakdown['completeness_score'] = round(($filledFields / $totalFields) * 20);

        // 3. Social Connections (0-15 points): 5 points per connected platform (max 3)
        $socialAccounts = $profile->socialAccounts;
        $platformCount = $socialAccounts->count();
        $breakdown['connections_score'] = min($platformCount * 5, 15);

        // 4. Engagement Rate (0-60 points)
        // Weighted heavily. E.g., >5% engagement gives full 60 points.
        if ($platformCount > 0) {
            $totalEngagement = 0;
            foreach ($socialAccounts as $account) {
                $rate = $account->engagement_rate ?? 0;
                $totalEngagement += (float) $rate;
            }
            $avgEngagement = $totalEngagement / $platformCount;
            
            // Formula: cap at 5%, (avg / 5) * 60
            $breakdown['engagement_score'] = min(round(($avgEngagement / 5.0) * 60), 60);
        } else {
            $breakdown['engagement_score'] = 0;
        }

        // Calculate Total
        $breakdown['total_score'] = $breakdown['variance_score'] 
                                  + $breakdown['completeness_score'] 
                                  + $breakdown['connections_score'] 
                                  + $breakdown['engagement_score'];

        // Cap total at 100
        $breakdown['total_score'] = min($breakdown['total_score'], 100);

        // Update the profile
        $profile->update([
            'ai_score' => $breakdown['total_score'],
            'profile_completeness' => $breakdown['profile_completeness_percentage'],
        ]);

        return $breakdown;
    }
}
