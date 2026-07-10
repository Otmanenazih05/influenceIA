<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthController extends Controller
{
    /**
     * GET /api/health
     *
     * Returns a simple JSON status to verify the API is running.
     * Also checks the database connection so we can spot config issues early.
     */
    public function index(): JsonResponse
    {
        $dbStatus = 'ok';
        $dbMessage = null;

        try {
            DB::connection()->getPdo();
        } catch (\Throwable $e) {
            $dbStatus = 'error';
            $dbMessage = $e->getMessage();
        }

        return response()->json([
            'status'  => $dbStatus === 'ok' ? 'ok' : 'degraded',
            'app'     => config('app.name'),
            'version' => app()->version(),
            'env'     => config('app.env'),
            'database' => [
                'status'  => $dbStatus,
                'driver'  => config('database.default'),
                'message' => $dbMessage,
            ],
            'timestamp' => now()->toIso8601String(),
        ], $dbStatus === 'ok' ? 200 : 503);
    }
}
