<?php

namespace App\Enums;

/**
 * Simulated escrow payment lifecycle.
 * Maps to the frontend's TransactionStatus / payment states in earnings.ts.
 */
enum PaymentStatus: string
{
    case Pending   = 'pending';    // brand initiated but not yet held
    case InEscrow  = 'in_escrow';  // funds held, awaiting content approval
    case Released  = 'released';   // funds released to influencer after approval
    case Refunded  = 'refunded';   // funds returned to brand (e.g., collaboration cancelled)
}
