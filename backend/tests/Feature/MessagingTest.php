<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\BrandProfile;
use App\Models\InfluencerProfile;
use App\Models\Conversation;
use App\Models\Message;
use App\Enums\UserRole;

class MessagingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->brandUser = User::factory()->create(['role' => UserRole::Brand]);
        $this->brandProfile = BrandProfile::factory()->create(['user_id' => $this->brandUser->id]);
        
        $this->influencerUser = User::factory()->create(['role' => UserRole::Influencer]);
        $this->influencerProfile = InfluencerProfile::factory()->create(['user_id' => $this->influencerUser->id]);

        $this->otherBrand = User::factory()->create(['role' => UserRole::Brand]);
        $this->otherBrandProfile = BrandProfile::factory()->create(['user_id' => $this->otherBrand->id]);
    }

    public function test_can_start_conversation_and_prevent_duplicates()
    {
        // Brand starts convo with influencer
        $response = $this->actingAs($this->brandUser)->postJson("/api/conversations", [
            'target_user_id' => $this->influencerUser->id
        ]);

        $response->assertStatus(201);
        $convoId = $response->json('data.id');

        // Trying to start again returns the same convo
        $response2 = $this->actingAs($this->brandUser)->postJson("/api/conversations", [
            'target_user_id' => $this->influencerUser->id
        ]);

        $response2->assertStatus(201)
                  ->assertJsonPath('data.id', $convoId);

        $this->assertDatabaseCount('conversations', 1);
    }

    public function test_can_send_and_list_messages()
    {
        $conversation = Conversation::create([
            'brand_profile_id' => $this->brandProfile->id,
            'influencer_profile_id' => $this->influencerProfile->id,
        ]);

        // Influencer sends a message
        $sendResponse = $this->actingAs($this->influencerUser)->postJson("/api/conversations/{$conversation->id}/messages", [
            'body' => 'Hello from influencer!'
        ]);
        
        $sendResponse->assertStatus(201);
        $this->assertDatabaseHas('messages', [
            'body' => 'Hello from influencer!',
            'sender_id' => $this->influencerUser->id
        ]);

        // Brand lists messages
        $listResponse = $this->actingAs($this->brandUser)->getJson("/api/conversations/{$conversation->id}/messages");
        $listResponse->assertStatus(200)
                     ->assertJsonPath('data.0.body', 'Hello from influencer!')
                     ->assertJsonPath('data.0.is_mine', false);
                     
        // Influencer lists messages (checks is_mine logic)
        $listResponseInf = $this->actingAs($this->influencerUser)->getJson("/api/conversations/{$conversation->id}/messages");
        $listResponseInf->assertJsonPath('data.0.is_mine', true);
    }

    public function test_cannot_access_unauthorized_conversation()
    {
        $conversation = Conversation::create([
            'brand_profile_id' => $this->brandProfile->id,
            'influencer_profile_id' => $this->influencerProfile->id,
        ]);

        // otherBrand tries to access it
        $response = $this->actingAs($this->otherBrand)->getJson("/api/conversations/{$conversation->id}/messages");
        $response->assertStatus(404); // Using where(...)->findOrFail() returns 404 for unauthorized rows cleanly
    }

    public function test_mark_as_read_updates_only_others_messages()
    {
        $conversation = Conversation::create([
            'brand_profile_id' => $this->brandProfile->id,
            'influencer_profile_id' => $this->influencerProfile->id,
        ]);

        $msg1 = Message::create(['conversation_id' => $conversation->id, 'sender_id' => $this->influencerUser->id, 'body' => 'msg1']);
        $msg2 = Message::create(['conversation_id' => $conversation->id, 'sender_id' => $this->brandUser->id, 'body' => 'msg2']);

        // Brand marks as read (should only affect msg1)
        $this->actingAs($this->brandUser)->putJson("/api/conversations/{$conversation->id}/read")->assertStatus(200);

        $msg1->refresh();
        $msg2->refresh();

        $this->assertNotNull($msg1->read_at);
        $this->assertNull($msg2->read_at); // Own message is not marked as read by self in this logic
    }
}
