<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
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
            'createdBy' => $this->user->name, 
            'usersCount' => $this->users()->count(),
            'description' => $this->description
        ];
    }
}
