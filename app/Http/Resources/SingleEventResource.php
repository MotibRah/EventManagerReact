<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'user' => UserResource::make($this->whenLoaded('user')),
            'startDate' => $this->event_date ?  Carbon::parse($this->event_date)->diffForHumans() : null,  
            'location' => $this->location,
            'status' => $this->status,
            'users' => $this->users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,  
                ];
            }),
            'description' => $this->description
        ];
    }
}
