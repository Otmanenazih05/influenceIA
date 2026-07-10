<?php

namespace App\Enums;

/**
 * How the payment is structured for a paid campaign.
 * Maps to the "paymentModel" field visible in campaign cards.
 */
enum PaymentModel: string
{
    case Fixed     = 'fixed';       // single flat fee
    case Milestone = 'milestone';   // phased payments (e.g., 50% on sign, 50% on approval)
    case PerPost   = 'per_post';    // paid per deliverable
    case Gifted    = 'gifted';      // product/service in lieu of cash
    case Hybrid    = 'hybrid';      // fee + product
    case Affiliate = 'affiliate';   // commission based
}
