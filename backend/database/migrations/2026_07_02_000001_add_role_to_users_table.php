<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Add role column to users table.
 * Role distinguishes between 'influencer' and 'brand' accounts.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Added after email so it appears logically in the schema
            $table->enum('role', ['influencer', 'brand'])
                  ->after('email')
                  ->default('influencer');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
