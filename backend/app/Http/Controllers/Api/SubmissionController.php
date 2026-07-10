<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CampaignApplication;
use App\Models\ContentSubmission;
use App\Http\Requests\StoreSubmissionRequest;
use App\Http\Requests\ReviewSubmissionRequest;
use App\Http\Resources\SubmissionResource;
use App\Enums\SubmissionStatus;
use App\Enums\ApplicationStatus;
use Illuminate\Http\JsonResponse;

class SubmissionController extends Controller
{
    /**
     * Influencer submits content for an accepted application.
     */
    public function store(StoreSubmissionRequest $request, $applicationId): JsonResponse
    {
        $application = CampaignApplication::findOrFail($applicationId);

        // Ensure user is the influencer who owns this application
        if ($application->influencer_profile_id !== $request->user()->influencerProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // Ensure application is accepted or in revision state
        if (!in_array($application->status->value, [ApplicationStatus::Accepted->value, ApplicationStatus::Revision->value])) {
            return response()->json(['message' => 'Application must be accepted to submit content.'], 400);
        }

        $submission = ContentSubmission::create([
            'campaign_application_id' => $applicationId,
            'deliverable_label' => $request->deliverable_label,
            'content_url' => $request->content_url,
            'status' => SubmissionStatus::Submitted,
            'submitted_at' => now(),
        ]);

        // Update application status to submitted
        $application->update(['status' => ApplicationStatus::Submitted]);

        return response()->json([
            'message' => 'Content submitted successfully.',
            'data' => new SubmissionResource($submission),
        ], 201);
    }

    /**
     * Brand reviews the submitted content.
     */
    public function updateStatus(ReviewSubmissionRequest $request, $id): JsonResponse
    {
        $submission = ContentSubmission::with('campaignApplication.campaign')->findOrFail($id);
        $campaign = $submission->campaignApplication->campaign;

        // Ensure the brand owns the campaign
        if ($campaign->brand_profile_id !== $request->user()->brandProfile->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $status = SubmissionStatus::from($request->status);

        $submission->update([
            'status' => $status,
            'revision_note' => $status === SubmissionStatus::RevisionRequested ? $request->revision_note : null,
            'reviewed_at' => now(),
        ]);

        // If approved, update application status
        if ($status === SubmissionStatus::Approved) {
            $submission->campaignApplication->update(['status' => ApplicationStatus::Approved]);
        } elseif ($status === SubmissionStatus::RevisionRequested) {
            $submission->campaignApplication->update(['status' => ApplicationStatus::Revision]);
        }

        return response()->json([
            'message' => 'Submission reviewed successfully.',
            'data' => new SubmissionResource($submission),
        ]);
    }
}
