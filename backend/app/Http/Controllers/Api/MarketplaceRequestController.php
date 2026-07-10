<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceListing;
use App\Models\MarketplaceRequest;
use App\Http\Requests\StoreMarketplaceRequest;
use App\Http\Requests\UpdateMarketplaceRequestStatusRequest;
use App\Http\Resources\MarketplaceRequestResource;
use App\Enums\MarketplaceListingStatus;
use App\Enums\MarketplaceRequestStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarketplaceRequestController extends Controller
{
    /**
     * Brand viewing requests for a specific listing.
     */
    public function indexForListing(Request $request, $listingId)
    {
        $listing = MarketplaceListing::findOrFail($listingId);

        if ($listing->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $query = MarketplaceRequest::with('influencerProfile.socialAccounts')
            ->where('marketplace_listing_id', $listingId);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return MarketplaceRequestResource::collection($query->paginate(1000));
    }

    /**
     * Influencer viewing their own marketplace requests.
     */
    public function mine(Request $request)
    {
        $influencerId = $request->user()->influencerProfile->id;

        $requests = MarketplaceRequest::with('listing.brandProfile')
            ->where('influencer_profile_id', $influencerId)
            ->paginate(1000);

        return MarketplaceRequestResource::collection($requests);
    }

    /**
     * Influencer requesting a listing.
     */
    public function store(StoreMarketplaceRequest $request, $listingId): JsonResponse
    {
        $listing = MarketplaceListing::findOrFail($listingId);
        $influencerId = $request->user()->influencerProfile->id;

        if (!in_array($listing->availability->value, [MarketplaceListingStatus::Available->value, MarketplaceListingStatus::Limited->value])) {
            return response()->json(['message' => 'Listing is no longer available.'], 400);
        }

        if (MarketplaceRequest::where('marketplace_listing_id', $listingId)->where('influencer_profile_id', $influencerId)->exists()) {
            return response()->json(['message' => 'Already requested this listing.'], 409);
        }

        $marketplaceRequest = MarketplaceRequest::create([
            'marketplace_listing_id' => $listingId,
            'influencer_profile_id' => $influencerId,
            'status' => MarketplaceRequestStatus::Requested,
            'message' => $request->message,
            'requested_at' => now(),
        ]);

        return response()->json([
            'message' => 'Requested successfully.',
            'data' => new MarketplaceRequestResource($marketplaceRequest),
        ], 201);
    }

    /**
     * Brand updating request status (approve, decline, fulfill).
     */
    public function updateStatus(UpdateMarketplaceRequestStatusRequest $request, $requestId): JsonResponse
    {
        $marketplaceRequest = MarketplaceRequest::with('listing')->findOrFail($requestId);
        
        if ($marketplaceRequest->listing->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $status = MarketplaceRequestStatus::from($request->status);

        $marketplaceRequest->update([
            'status' => $status,
        ]);

        return response()->json([
            'message' => 'Request status updated.',
            'data' => new MarketplaceRequestResource($marketplaceRequest),
        ]);
    }
}
