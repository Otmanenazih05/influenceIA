<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterInfluencerRequest;
use App\Http\Requests\RegisterBrandRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\AddSocialAccountsRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\InfluencerProfile;
use App\Models\BrandProfile;
use App\Models\SocialAccount;
use App\Enums\UserRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function registerInfluencer(RegisterInfluencerRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {
            $user = User::create([
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'name' => $validated['full_name'], // mapping full_name to User name field
                'role' => UserRole::Influencer,
            ]);

            InfluencerProfile::create([
                'user_id' => $user->id,
                'full_name' => $validated['full_name'],
                'gender' => $validated['gender'] ?? null,
                'country' => $validated['country'] ?? null,
                'city' => $validated['city'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'age_confirmed' => $validated['age_confirmed'],
                'terms_accepted' => $validated['terms_accepted'],
            ]);

            return $user;
        });

        // Load profile for response
        $user->load('influencerProfile');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Influencer registered successfully.',
            'data' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function registerBrand(RegisterBrandRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {
            $user = User::create([
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'name' => $validated['company_name'],
                'role' => UserRole::Brand,
            ]);

            BrandProfile::create([
                'user_id' => $user->id,
                'company_name' => $validated['company_name'],
                'contact_name' => $validated['contact_name'] ?? null,
                'industry' => $validated['industry'] ?? null,
                'website' => $validated['website'] ?? null,
                'phone' => $validated['phone'] ?? null,
            ]);

            return $user;
        });

        $user->load('brandProfile');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Brand registered successfully.',
            'data' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function addSocialAccounts(AddSocialAccountsRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $profile = $request->user()->influencerProfile;

        if (!$profile) {
            return response()->json(['message' => 'Influencer profile not found.'], 404);
        }

        foreach ($validated['accounts'] as $accountData) {
            // Use updateOrCreate to allow updating an existing platform (e.g. if they reconnect Instagram)
            SocialAccount::updateOrCreate(
                [
                    'influencer_profile_id' => $profile->id,
                    'platform' => $accountData['platform'],
                ],
                $accountData
            );
        }

        // Trigger AI score calculation
        app(\App\Services\InfluencerScoreService::class)->calculateScore($profile);
        
        // Return updated profile with accounts
        $profile->load('socialAccounts');

        return response()->json([
            'message' => 'Social accounts updated successfully.',
            'data' => new \App\Http\Resources\InfluencerProfileResource($profile),
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid login credentials.'
            ], 401);
        }

        // Revoke older tokens to ensure clean state if desired, or keep them.
        // We will just issue a new token.
        $token = $user->createToken('auth_token')->plainTextToken;
        
        $user->load(['influencerProfile.socialAccounts', 'brandProfile']);

        return response()->json([
            'message' => 'Logged in successfully.',
            'data' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Eager load necessary profiles
        $user->load(['influencerProfile.socialAccounts', 'brandProfile']);

        return response()->json([
            'data' => new UserResource($user),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out.'
        ]);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        $user = $request->user();

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Current password does not match.'
            ], 400);
        }

        $user->update([
            'password' => Hash::make($validated['new_password'])
        ]);

        return response()->json([
            'message' => 'Password updated successfully.'
        ]);
    }
}
