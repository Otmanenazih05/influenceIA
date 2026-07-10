<?php

namespace App\Enums;

/**
 * Status of a content submission item.
 * Maps to ContentItem.status in the frontend's applications.ts.
 */
enum SubmissionStatus: string
{
    case Pending          = 'pending';           // not yet submitted
    case Submitted        = 'submitted';          // URL provided, awaiting brand review
    case PendingReview    = 'pending_review';     // alias kept for API compatibility
    case Approved         = 'approved';           // brand approved this piece of content
    case RevisionRequested = 'revision';          // brand asked for changes (matches frontend 'revision')
}
