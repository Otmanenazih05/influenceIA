<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InfluencerProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();
        if ($user->role->value !== 'influencer') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $profile = $user->influencerProfile;
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $validated = $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'bio' => 'sometimes|string|nullable',
            'gender' => 'sometimes|string|max:50',
            'country' => 'sometimes|string|max:100',
            'city' => 'sometimes|string|max:100',
            'phone' => 'sometimes|string|max:50',
            'niches' => 'sometimes|array',
            'profile_photo_url' => 'sometimes|url|nullable',
        ]);

        $profile->update($validated);
        
        // update user's name if full_name is provided
        if (isset($validated['full_name'])) {
            $user->update(['name' => $validated['full_name']]);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => new \App\Http\Resources\InfluencerProfileResource($profile->fresh()),
        ]);
    }

    public function updatePreferences(Request $request)
    {
        $user = $request->user();
        if ($user->role->value !== 'influencer') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $profile = $user->influencerProfile;
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $validated = $request->validate([
            'preferences' => 'required|array',
        ]);

        $profile->update(['preferences' => $validated['preferences']]);

        return response()->json([
            'message' => 'Preferences updated successfully',
            'preferences' => $profile->fresh()->preferences,
        ]);
    }

    public function index(Request $request)
    {
        $query = \App\Models\InfluencerProfile::with(['socialAccounts', 'user:id,name,email']);

        // Filter by country
        if ($request->has('country')) {
            $query->where('country', $request->country);
        }

        // Filter by niche (JSON contains)
        if ($request->has('niche')) {
            $query->whereJsonContains('niches', $request->niche);
        }

        // Filter by AI score range
        if ($request->has('min_ai_score')) {
            $query->where('ai_score', '>=', $request->min_ai_score);
        }

        // Filter by platform and/or follower tier using social accounts
        if ($request->has('platform') || $request->has('min_followers')) {
            $query->whereHas('socialAccounts', function ($q) use ($request) {
                if ($request->has('platform')) {
                    $q->where('platform', $request->platform);
                }
                if ($request->has('min_followers')) {
                    $q->where('followers_count', '>=', $request->min_followers);
                }
            });
        }

        $profiles = $query->paginate(1000);
        return response()->json($profiles);
    }

    public function show($id)
    {
        $profile = \App\Models\InfluencerProfile::with(['socialAccounts', 'user:id,name,email'])->findOrFail($id);
        return response()->json($profile);
    }
}
