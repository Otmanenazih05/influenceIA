<?php

namespace App\Enums;

/**
 * The nature of the collaboration — matches frontend CampaignType.
 */
enum CampaignType: string
{
    case Paid       = 'paid';
    case Gifted     = 'gifted';
    case Affiliate  = 'affiliate';
    case Ambassador = 'ambassador';
}
