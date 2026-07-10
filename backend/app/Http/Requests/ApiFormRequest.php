<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Base Form Request for all InfluenceIA API requests.
 *
 * All API Form Requests should extend this class instead of FormRequest directly.
 * Override authorize() per request to enforce role-based access.
 */
abstract class ApiFormRequest extends FormRequest
{
    /**
     * By default, all API requests are authorized.
     * Override in specific request classes to add role/permission checks.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Return validation errors as a JSON response (standard API format).
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator): never
    {
        throw new \Illuminate\Validation\ValidationException($validator, response()->json([
            'message' => 'Validation failed.',
            'errors'  => $validator->errors(),
        ], 422));
    }
}
