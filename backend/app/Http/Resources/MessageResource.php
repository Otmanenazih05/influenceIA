<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $isMine = $this->sender_id === $request->user()->id;

        return [
            'id' => $this->id,
            'conversation_id' => $this->conversation_id,
            'body' => $this->body,
            'is_mine' => $isMine,
            'read_at' => $this->read_at,
            'created_at' => $this->created_at,
        ];
    }
}
