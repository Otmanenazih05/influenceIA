<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HealthController;

/*
|--------------------------------------------------------------------------
| API Routes — InfluenceIA
|--------------------------------------------------------------------------
|
| All routes here are prefixed with /api automatically.
| Authentication is handled via Laravel Sanctum tokens (Bearer token).
|
| Route groups:
|   Public routes  — no auth required
|   Auth routes    — require auth:sanctum middleware
|
*/

// ─── Public: Health check ──────────────────────────────────────────────────
Route::get('/health', [HealthController::class, 'index']);

// ─── Public: Authentication ──────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/register/influencer', [\App\Http\Controllers\Api\AuthController::class, 'registerInfluencer']);
    Route::post('/register/brand', [\App\Http\Controllers\Api\AuthController::class, 'registerBrand']);
    Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);
});

// ─── Protected: Require Sanctum token ─────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    
    // Core auth actions
    Route::prefix('auth')->group(function () {
        Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
        Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
        Route::put('/password', [\App\Http\Controllers\Api\AuthController::class, 'updatePassword']);
        
        // Influencer-only onboarding step
        Route::post('/social-accounts', [\App\Http\Controllers\Api\AuthController::class, 'addSocialAccounts'])
            ->middleware('role:influencer');
    });

    // ── Influencer routes (role: influencer) ──
    Route::middleware('role:influencer')->group(function () {
        // Profile & Settings
        Route::put('/influencer/profile', [\App\Http\Controllers\Api\InfluencerProfileController::class, 'update']);
        Route::put('/influencer/preferences', [\App\Http\Controllers\Api\InfluencerProfileController::class, 'updatePreferences']);
        Route::put('/influencer/social-accounts/{id}', [\App\Http\Controllers\Api\SocialAccountController::class, 'update']);
        Route::delete('/influencer/social-accounts/{id}', [\App\Http\Controllers\Api\SocialAccountController::class, 'destroy']);

        // Browse campaigns
        Route::get('/campaigns', [\App\Http\Controllers\Api\CampaignController::class, 'index']);
        
        // Apply to campaign
        Route::post('/campaigns/{id}/apply', [\App\Http\Controllers\Api\ApplicationController::class, 'store']);
        
        // View applications
        Route::get('/applications/mine', [\App\Http\Controllers\Api\ApplicationController::class, 'mine']);
        
        // Submit content
        Route::post('/applications/{id}/submissions', [\App\Http\Controllers\Api\SubmissionController::class, 'store']);
        
        // Marketplace: Browse and request
        Route::get('/marketplace/listings', [\App\Http\Controllers\Api\MarketplaceListingController::class, 'index']);
        Route::post('/marketplace/listings/{id}/request', [\App\Http\Controllers\Api\MarketplaceRequestController::class, 'store']);
        Route::get('/marketplace/requests/mine', [\App\Http\Controllers\Api\MarketplaceRequestController::class, 'mine']);
        
        // AI Coach / Scoring Explanations
        Route::get('/influencer/score-explanation', [\App\Http\Controllers\Api\AiScoreController::class, 'influencerScoreExplanation']);
        Route::get('/campaigns/{id}/match-explanation', [\App\Http\Controllers\Api\AiScoreController::class, 'campaignMatchExplanation']);
        
        // Payments & Escrow
        Route::get('/payments/influencer-summary', [\App\Http\Controllers\Api\PaymentController::class, 'influencerSummary']);
        Route::post('/payments/withdraw', [\App\Http\Controllers\Api\PaymentController::class, 'withdraw']);
    });

    // ── Brand routes (role: brand) ──
    Route::middleware('role:brand')->group(function () {
        // Brand Profile
        Route::put('/brand/profile', [\App\Http\Controllers\Api\BrandProfileController::class, 'update']);

        // Manage campaigns
        Route::get('/campaigns/mine', [\App\Http\Controllers\Api\CampaignController::class, 'mine']);
        Route::post('/campaigns', [\App\Http\Controllers\Api\CampaignController::class, 'store']);
        Route::put('/campaigns/{id}', [\App\Http\Controllers\Api\CampaignController::class, 'update']);
        Route::delete('/campaigns/{id}', [\App\Http\Controllers\Api\CampaignController::class, 'destroy']);
        
        // Review applications and Invite
        Route::get('/campaigns/{id}/applications', [\App\Http\Controllers\Api\ApplicationController::class, 'indexForCampaign']);
        Route::put('/campaigns/{campaignId}/applications/{applicationId}', [\App\Http\Controllers\Api\ApplicationController::class, 'updateStatus']);
        Route::post('/campaigns/{campaignId}/invite/{influencerId}', [\App\Http\Controllers\Api\ApplicationController::class, 'invite']);
        
        // Review submissions
        Route::put('/submissions/{id}', [\App\Http\Controllers\Api\SubmissionController::class, 'updateStatus']);
        
        // Marketplace: Manage listings and review requests
        Route::get('/marketplace/listings/mine', [\App\Http\Controllers\Api\MarketplaceListingController::class, 'mine']);
        Route::post('/marketplace/listings', [\App\Http\Controllers\Api\MarketplaceListingController::class, 'store']);
        Route::put('/marketplace/listings/{id}', [\App\Http\Controllers\Api\MarketplaceListingController::class, 'update']);
        Route::delete('/marketplace/listings/{id}', [\App\Http\Controllers\Api\MarketplaceListingController::class, 'destroy']);
        
        Route::get('/marketplace/listings/{id}/requests', [\App\Http\Controllers\Api\MarketplaceRequestController::class, 'indexForListing']);
        Route::put('/marketplace/requests/{id}', [\App\Http\Controllers\Api\MarketplaceRequestController::class, 'updateStatus']);
        
        // Payments & Escrow
        Route::post('/applications/{id}/payments/initiate', [\App\Http\Controllers\Api\PaymentController::class, 'initiate']);
        Route::put('/payments/{id}/fund', [\App\Http\Controllers\Api\PaymentController::class, 'fund']);
        Route::put('/payments/{id}/release', [\App\Http\Controllers\Api\PaymentController::class, 'release']);
        Route::get('/payments/brand-summary', [\App\Http\Controllers\Api\PaymentController::class, 'brandSummary']);
    });

    // ── Shared / Cross-Role protected routes ──
    // Discover Creators (Brands need this to invite, Influencers could theoretically view others or maybe only brands)
    // Actually, making it shared is fine, but realistically brands use it. Let's make it shared.
    Route::get('/creators', [\App\Http\Controllers\Api\InfluencerProfileController::class, 'index']);
    Route::get('/creators/{id}', [\App\Http\Controllers\Api\InfluencerProfileController::class, 'show']);

    // View a specific campaign (active public for influencer, or owned for brand)
    Route::get('/campaigns/{id}', [\App\Http\Controllers\Api\CampaignController::class, 'show']);
    
    // View a specific application (owned by influencer, or for a brand's campaign)
    Route::get('/applications/{id}', [\App\Http\Controllers\Api\ApplicationController::class, 'show']);
    
    // View a specific marketplace listing
    Route::get('/marketplace/listings/{id}', [\App\Http\Controllers\Api\MarketplaceListingController::class, 'show']);
    
    // Messaging / Conversations
    Route::get('/conversations', [\App\Http\Controllers\Api\ConversationController::class, 'index']);
    Route::post('/conversations', [\App\Http\Controllers\Api\ConversationController::class, 'store']);
    Route::get('/conversations/{id}/messages', [\App\Http\Controllers\Api\ConversationController::class, 'messages']);
    Route::post('/conversations/{id}/messages', [\App\Http\Controllers\Api\ConversationController::class, 'sendMessage']);
    Route::put('/conversations/{id}/read', [\App\Http\Controllers\Api\ConversationController::class, 'markAsRead']);
});
