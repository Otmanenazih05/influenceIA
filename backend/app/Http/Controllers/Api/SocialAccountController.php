<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SocialAccount;

class SocialAccountController extends Controller
{
    public function update(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role->value !== 'influencer') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $profile = $user->influencerProfile;
        
        $account = SocialAccount::where('id', $id)->where('influencer_profile_id', $profile->id)->first();
        if (!$account) {
            return response()->json(['message' => 'Social account not found'], 404);
        }

        $validated = $request->validate([
            'platform' => 'sometimes|string|max:50',
            'handle' => 'sometimes|string|max:255',
            'follower_count' => 'sometimes|integer|min:0',
            'engagement_rate' => 'sometimes|numeric|min:0',
        ]);

        $account->update($validated);

        return response()->json([
            'message' => 'Social account updated successfully',
            'account' => $account->fresh(),
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if ($user->role->value !== 'influencer') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $profile = $user->influencerProfile;
        
        $account = SocialAccount::where('id', $id)->where('influencer_profile_id', $profile->id)->first();
        if (!$account) {
            return response()->json(['message' => 'Social account not found'], 404);
        }

        $account->delete();

        return response()->json(['message' => 'Social account deleted successfully']);
    }
}
