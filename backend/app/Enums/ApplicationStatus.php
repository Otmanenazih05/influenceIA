<?php

namespace App\Enums;

/**
 * Status of an influencer's application to a campaign.
 * Mirrors frontend's AppStatus type exactly for seamless data mapping.
 */
enum ApplicationStatus: string
{
    case Pending     = 'pending';      // submitted, awaiting brand review
    case Shortlisted = 'shortlisted';  // brand shortlisted the creator
    case Accepted    = 'accepted';     // brand accepted the creator
    case Rejected    = 'rejected';     // brand declined
    case Submitted   = 'submitted';    // creator submitted content for review
    case Revision  = 'revision';   // brand requested changes
    case Approved  = 'approved';   // content approved, payment to be released
    case Completed = 'completed';  // payment released, collaboration done
}
