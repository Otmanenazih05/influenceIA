<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class BrandProfileResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_name' => $this->company_name,
            'contact_name' => $this->contact_name,
            'industry' => $this->industry,
            'website' => $this->website,
            'phone' => $this->phone,
            'logo_url' => $this->logo_url,
            'country' => $this->country,
            'city' => $this->city,
            'description' => $this->description,
        ];
    }
}
