<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Enums\UserRole;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_influencer_can_register(): void
    {
        $response = $this->postJson('/api/auth/register/influencer', [
            'email' => 'influencer@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'full_name' => 'John Doe',
            'age_confirmed' => true,
            'terms_accepted' => true,
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'data' => ['id', 'email', 'role', 'influencer_profile'],
                     'access_token'
                 ]);
                 
        $this->assertDatabaseHas('users', [
            'email' => 'influencer@example.com',
            'role' => UserRole::Influencer,
        ]);
    }

    public function test_brand_can_register(): void
    {
        $response = $this->postJson('/api/auth/register/brand', [
            'email' => 'brand@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'company_name' => 'Acme Corp',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'data' => ['id', 'email', 'role', 'brand_profile'],
                     'access_token'
                 ]);
                 
        $this->assertDatabaseHas('users', [
            'email' => 'brand@example.com',
            'role' => UserRole::Brand,
        ]);
    }

    public function test_duplicate_email_fails(): void
    {
        User::factory()->create(['email' => 'test@example.com']);

        $response = $this->postJson('/api/auth/register/influencer', [
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'full_name' => 'John Doe',
            'age_confirmed' => true,
            'terms_accepted' => true,
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

    public function test_user_can_login(): void
    {
        $user = User::factory()->create([
            'email' => 'login@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'login@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['access_token', 'data' => ['id', 'email']]);
    }

    public function test_authenticated_user_can_get_me(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
                         ->getJson('/api/auth/me');

        $response->assertStatus(200)
                 ->assertJsonPath('data.email', $user->email);
    }
}
