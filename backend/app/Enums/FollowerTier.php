<?php

namespace App\Enums;

/**
 * Follower tier classification for creators and campaign targeting.
 * Nano: < 10K | Micro: 10K–100K | Macro: > 100K
 */
enum FollowerTier: string
{
    case Nano  = 'nano';   // < 10 000 followers
    case Micro = 'micro';  // 10 000 – 100 000
    case Macro = 'macro';  // > 100 000
    case Any   = 'any';    // no restriction (campaign targeting)
}
