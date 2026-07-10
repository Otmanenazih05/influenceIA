<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use App\Enums\UserRole;
use App\Http\Requests\StartConversationRequest;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;

class ConversationController extends Controller
{
    /**
     * Get the profile field mapping based on user role.
     */
    private function getProfileField(User $user)
    {
        return $user->role === UserRole::Brand ? 'brand_profile_id' : 'influencer_profile_id';
    }

    private function getProfileId(User $user)
    {
        return $user->role === UserRole::Brand ? $user->brandProfile->id : $user->influencerProfile->id;
    }

    /**
     * List all conversations for the authenticated user.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $field = $this->getProfileField($user);
        $profileId = $this->getProfileId($user);

        $conversations = Conversation::with(['brandProfile', 'influencerProfile', 'campaign'])
            // Add a subquery for the latest message to avoid heavy n+1 on the whole message history
            ->with(['messages' => function ($query) {
                $query->latest()->limit(1);
            }])
            ->withCount(['messages as unread_count' => function ($query) use ($user) {
                $query->where('sender_id', '!=', $user->id)
                      ->whereNull('read_at');
            }])
            ->where($field, $profileId)
            ->orderBy('updated_at', 'desc')
            ->paginate(1000);

        return ConversationResource::collection($conversations);
    }

    /**
     * Start a new conversation or return an existing one.
     */
    public function store(StartConversationRequest $request)
    {
        $user = $request->user();
        $targetUser = User::findOrFail($request->target_user_id);

        if ($user->id === $targetUser->id) {
            return response()->json(['message' => 'You cannot start a conversation with yourself.'], 400);
        }

        if ($user->role === $targetUser->role) {
            return response()->json(['message' => 'Conversations must be between a brand and an influencer.'], 400);
        }

        $brandId = $user->role === UserRole::Brand ? $user->brandProfile->id : $targetUser->brandProfile->id;
        $influencerId = $user->role === UserRole::Influencer ? $user->influencerProfile->id : $targetUser->influencerProfile->id;

        // Check for existing conversation with the same campaign context
        $query = Conversation::where('brand_profile_id', $brandId)
                             ->where('influencer_profile_id', $influencerId);
                             
        if ($request->filled('campaign_id')) {
            $query->where('campaign_id', $request->campaign_id);
        } else {
            $query->whereNull('campaign_id');
        }

        $conversation = $query->first();

        if (!$conversation) {
            $conversation = Conversation::create([
                'brand_profile_id' => $brandId,
                'influencer_profile_id' => $influencerId,
                'campaign_id' => $request->campaign_id,
            ]);
        }

        $conversation->load(['brandProfile', 'influencerProfile', 'campaign']);
        // Initialize an empty messages collection so resource doesn't fail
        $conversation->setRelation('messages', collect());

        return response()->json([
            'message' => 'Conversation started.',
            'data' => new ConversationResource($conversation),
        ], 201);
    }

    /**
     * Get messages for a specific conversation.
     */
    public function messages(Request $request, $id)
    {
        $user = $request->user();
        $field = $this->getProfileField($user);
        $profileId = $this->getProfileId($user);

        $conversation = Conversation::where($field, $profileId)->findOrFail($id);

        // Fetch messages paginated from newest to oldest for easy infinite scroll up
        $messages = $conversation->messages()
                                 ->orderBy('created_at', 'desc')
                                 ->paginate(30);

        return MessageResource::collection($messages);
    }

    /**
     * Send a message in a conversation.
     */
    public function sendMessage(SendMessageRequest $request, $id)
    {
        $user = $request->user();
        $field = $this->getProfileField($user);
        $profileId = $this->getProfileId($user);

        // Ensure user belongs to conversation
        $conversation = Conversation::where($field, $profileId)->findOrFail($id);

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'sender_id' => $user->id,
            'body' => $request->body,
        ]);

        // Bubble the conversation up
        $conversation->touch();

        return response()->json([
            'message' => 'Message sent.',
            'data' => new MessageResource($message),
        ], 201);
    }

    /**
     * Mark all unread messages from the other user as read.
     */
    public function markAsRead(Request $request, $id)
    {
        $user = $request->user();
        $field = $this->getProfileField($user);
        $profileId = $this->getProfileId($user);

        $conversation = Conversation::where($field, $profileId)->findOrFail($id);

        $conversation->messages()
                     ->where('sender_id', '!=', $user->id)
                     ->whereNull('read_at')
                     ->update(['read_at' => now()]);

        return response()->json([
            'message' => 'Messages marked as read.',
        ]);
    }
}
