<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MarketplaceListing;
use App\Http\Requests\StoreMarketplaceListingRequest;
use App\Http\Requests\UpdateMarketplaceListingRequest;
use App\Http\Resources\MarketplaceListingResource;
use App\Enums\MarketplaceListingStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MarketplaceListingController extends Controller
{
    /**
     * Influencer browsing all active listings.
     */
    public function index(Request $request)
    {
        $query = MarketplaceListing::with('brandProfile')
            ->whereIn('availability', [
                MarketplaceListingStatus::Available->value,
                MarketplaceListingStatus::Limited->value
            ]);

        // Filters
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }
        if ($request->filled('platform')) {
            $query->whereJsonContains('platforms', $request->platform);
        }
        if ($request->filled('brand_profile_id')) {
            $query->where('brand_profile_id', $request->brand_profile_id);
        }

        $listings = $query->paginate(1000);

        return MarketplaceListingResource::collection($listings);
    }

    /**
     * Brand viewing their own listings with request counts.
     */
    public function mine(Request $request)
    {
        $brandId = $request->user()->brandProfile->id;

        $listings = MarketplaceListing::where('brand_profile_id', $brandId)
            ->withCount('requests')
            ->paginate(1000);

        return MarketplaceListingResource::collection($listings);
    }

    /**
     * Store a newly created listing.
     */
    public function store(StoreMarketplaceListingRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['brand_profile_id'] = $request->user()->brandProfile->id;

        $listing = MarketplaceListing::create($validated);

        return response()->json([
            'message' => 'Marketplace listing created successfully.',
            'data' => new MarketplaceListingResource($listing),
        ], 201);
    }

    /**
     * Display a specific listing.
     */
    public function show(Request $request, $id)
    {
        $listing = MarketplaceListing::with('brandProfile')->findOrFail($id);

        return new MarketplaceListingResource($listing);
    }

    /**
     * Update the listing.
     */
    public function update(UpdateMarketplaceListingRequest $request, $id): JsonResponse
    {
        $listing = MarketplaceListing::findOrFail($id);

        if ($listing->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $listing->update($request->validated());

        return response()->json([
            'message' => 'Marketplace listing updated successfully.',
            'data' => new MarketplaceListingResource($listing),
        ]);
    }

    /**
     * Delete/close the listing.
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $listing = MarketplaceListing::findOrFail($id);

        if ($listing->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $listing->delete();

        return response()->json([
            'message' => 'Marketplace listing deleted successfully.'
        ]);
    }
}
