<?php

namespace App\Enums;

/**
 * Lifecycle status of a campaign.
 * Aligns with frontend's brandCampaigns status: draft, active, reviewing (→ mapped as active here),
 * paused, completed, plus 'closed' for ended campaigns.
 */
enum CampaignStatus: string
{
    case Draft     = 'draft';
    case Active    = 'active';
    case Paused    = 'paused';
    case Reviewing = 'reviewing'; // applications under review, accepting no new ones
    case Closed    = 'closed';
    case Completed = 'completed';
}
