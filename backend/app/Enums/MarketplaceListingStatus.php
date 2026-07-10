<?php

namespace App\Enums;

/**
 * Availability status of a marketplace (gifted/barter) listing.
 * Maps to frontend's ProductAvailability: available | limited | full, plus closed.
 */
enum MarketplaceListingStatus: string
{
    case Available = 'available'; // spots open
    case Limited   = 'limited';   // few spots left
    case Full      = 'full';      // all spots taken, no new requests
    case Closed    = 'closed';    // brand manually closed the listing
}
