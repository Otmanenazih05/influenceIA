<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\CampaignApplication;
use App\Models\Withdrawal;
use App\Enums\PaymentStatus;
use App\Enums\ApplicationStatus;
use App\Http\Requests\InitiatePaymentRequest;
use App\Http\Requests\WithdrawRequest;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\WithdrawalResource;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    /**
     * Brand: Initiate a payment for an accepted application.
     */
    public function initiate(InitiatePaymentRequest $request, $applicationId)
    {
        $brandId = $request->user()->brandProfile->id;
        
        $application = CampaignApplication::with('campaign')->findOrFail($applicationId);

        if ($application->campaign->brand_profile_id !== $brandId) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($application->status->value !== ApplicationStatus::Accepted->value && $application->status->value !== ApplicationStatus::Completed->value) {
            return response()->json(['message' => 'Application must be accepted before initiating payment.'], 400);
        }

        // Check if payment already exists
        if ($application->payment) {
            return response()->json(['message' => 'Payment already exists for this application.'], 409);
        }

        $payment = Payment::create([
            'campaign_application_id' => $application->id,
            'amount' => $request->amount,
            'status' => PaymentStatus::Pending,
        ]);

        return response()->json([
            'message' => 'Payment initiated.',
            'data' => new PaymentResource($payment),
        ], 201);
    }

    /**
     * Brand: Fund a payment (move from pending to in_escrow).
     */
    public function fund(Request $request, $id)
    {
        $brandId = $request->user()->brandProfile->id;
        $payment = Payment::with('campaignApplication.campaign')->findOrFail($id);

        if ($payment->campaignApplication->campaign->brand_profile_id !== $brandId) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($payment->status !== PaymentStatus::Pending) {
            return response()->json(['message' => 'Only pending payments can be funded.'], 400);
        }

        $payment->update([
            'status' => PaymentStatus::InEscrow,
            'escrowed_at' => now(),
        ]);

        return response()->json([
            'message' => 'Payment funded successfully.',
            'data' => new PaymentResource($payment),
        ]);
    }

    /**
     * Brand: Release a payment to the influencer.
     */
    public function release(Request $request, $id)
    {
        $brandId = $request->user()->brandProfile->id;
        $payment = Payment::with('campaignApplication.campaign', 'campaignApplication.contentSubmissions')->findOrFail($id);

        if ($payment->campaignApplication->campaign->brand_profile_id !== $brandId) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($payment->status !== PaymentStatus::InEscrow) {
            return response()->json(['message' => 'Only escrowed payments can be released.'], 400);
        }

        // Check if there is an approved submission
        $hasApprovedSubmission = $payment->campaignApplication->contentSubmissions
            ->where('status', \App\Enums\SubmissionStatus::Approved)
            ->isNotEmpty();

        if (!$hasApprovedSubmission) {
            return response()->json(['message' => 'Cannot release payment. No approved content submission found.'], 400);
        }

        $payment->update([
            'status' => PaymentStatus::Released,
            'released_at' => now(),
        ]);

        return response()->json([
            'message' => 'Payment released successfully.',
            'data' => new PaymentResource($payment),
        ]);
    }

    /**
     * Brand: Get payments summary.
     */
    public function brandSummary(Request $request)
    {
        $brandId = $request->user()->brandProfile->id;

        // Base query for payments belonging to this brand's campaigns
        $query = Payment::whereHas('campaignApplication.campaign', function ($q) use ($brandId) {
            $q->where('brand_profile_id', $brandId);
        });

        $totalInEscrow = (clone $query)->where('status', PaymentStatus::InEscrow->value)->sum('amount');
        $totalReleased = (clone $query)->where('status', PaymentStatus::Released->value)->sum('amount');

        $transactions = $query->with('campaignApplication.influencerProfile')
                              ->orderBy('created_at', 'desc')
                              ->paginate(1000);

        return response()->json([
            'data' => [
                'total_in_escrow' => $totalInEscrow,
                'total_released' => $totalReleased,
                'transactions' => PaymentResource::collection($transactions)->response()->getData(true),
            ]
        ]);
    }

    /**
     * Influencer: Get payments summary (wallet).
     */
    public function influencerSummary(Request $request)
    {
        $influencerId = $request->user()->influencerProfile->id;

        $query = Payment::whereHas('campaignApplication', function ($q) use ($influencerId) {
            $q->where('influencer_profile_id', $influencerId);
        });

        $totalEarned = (clone $query)->where('status', PaymentStatus::Released->value)->sum('amount');
        $totalPending = (clone $query)->where('status', PaymentStatus::InEscrow->value)->sum('amount');
        
        $totalWithdrawn = Withdrawal::where('influencer_profile_id', $influencerId)->sum('amount');
        
        $availableBalance = max(0, $totalEarned - $totalWithdrawn);

        $transactions = $query->with('campaignApplication.campaign.brandProfile')
                              ->orderBy('created_at', 'desc')
                              ->paginate(1000);

        return response()->json([
            'data' => [
                'total_earned' => $totalEarned,
                'total_pending' => $totalPending,
                'total_withdrawn' => $totalWithdrawn,
                'available_balance' => $availableBalance,
                'transactions' => PaymentResource::collection($transactions)->response()->getData(true),
            ]
        ]);
    }

    /**
     * Influencer: Withdraw funds.
     */
    public function withdraw(WithdrawRequest $request)
    {
        $influencerId = $request->user()->influencerProfile->id;
        $requestedAmount = (float) $request->amount;

        $totalEarned = Payment::whereHas('campaignApplication', function ($q) use ($influencerId) {
            $q->where('influencer_profile_id', $influencerId);
        })->where('status', PaymentStatus::Released->value)->sum('amount');

        $totalWithdrawn = Withdrawal::where('influencer_profile_id', $influencerId)->sum('amount');
        
        $availableBalance = max(0, $totalEarned - $totalWithdrawn);

        if ($requestedAmount > $availableBalance) {
            return response()->json([
                'message' => "Insufficient funds. Available balance: {$availableBalance}",
            ], 400);
        }

        $withdrawal = Withdrawal::create([
            'influencer_profile_id' => $influencerId,
            'amount' => $requestedAmount,
            'reference_id' => 'WD-' . strtoupper(Str::random(10)),
        ]);

        return response()->json([
            'message' => 'Withdrawal successful.',
            'data' => new WithdrawalResource($withdrawal),
        ], 201);
    }
}
