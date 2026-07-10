<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BrandProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();
        
        if ($user->role->value !== 'brand') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $profile = $user->brandProfile;
        
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $validated = $request->validate([
            'company_name' => 'sometimes|string|max:255',
            'contact_name' => 'sometimes|string|max:255',
            'industry' => 'sometimes|string|max:255',
            'website' => 'sometimes|url|nullable',
            'phone' => 'sometimes|string|max:50',
            'country' => 'sometimes|string|max:100',
            'city' => 'sometimes|string|max:100',
            'logo_url' => 'sometimes|url|nullable',
            'description' => 'sometimes|string|nullable',
        ]);

        $profile->update($validated);
        
        // update user's name if contact_name is provided
        if (isset($validated['contact_name'])) {
            $user->update(['name' => $validated['contact_name']]);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => new \App\Http\Resources\BrandProfileResource($profile->fresh()),
        ]);
    }
}
