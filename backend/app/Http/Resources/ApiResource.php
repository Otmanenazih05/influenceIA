<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Base API Resource for all InfluenceIA JSON responses.
 *
 * All API Resource classes should extend this class.
 * Removes the default "data" wrapper for consistency, or
 * keep it by removing the $wrap override below.
 */
class ApiResource extends JsonResource
{
    /**
     * Wrap all resource responses in a "data" key.
     * This is Laravel's default behaviour — keeping it explicit here.
     */
    public static $wrap = 'data';

    /**
     * Add standard metadata to every resource response.
     */
    public function with($request): array
    {
        return [
            'meta' => [
                'api_version' => '1.0',
            ],
        ];
    }
}
