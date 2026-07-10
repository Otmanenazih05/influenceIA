<?php

namespace App\Enums;

/**
 * Status of an influencer's request for a marketplace (gifted) listing.
 */
enum MarketplaceRequestStatus: string
{
    case Requested = 'requested'; // influencer submitted the request
    case Approved  = 'approved';  // brand confirmed, product will be sent
    case Declined  = 'declined';  // brand declined the request
    case Fulfilled = 'fulfilled'; // product delivered, content submitted
}
