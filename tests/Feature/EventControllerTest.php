<?php

use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Illuminate\Support\Facades\Auth;

beforeEach(function () {
    // Reset the database before each test
    $this->artisan('migrate:fresh');
    $this->user = User::factory()->create();  
    Auth::login($this->user); 
});

it('can create an event', function () {
    $eventData = [
        'title' => 'Sample Event',
        'description' => 'Event description',
        'event_date' => '2024-12-10',
        'event_time' => '12:00',
        'location' => 'Sample location',
        'status' => 'Pending',
    ];

    $response = $this->post(route('events.store'), $eventData);

    $response->assertRedirect(route('events.index'));  
    $this->assertDatabaseHas('events', [
        'title' => 'Sample Event',
        'description' => 'Event description',
        'location' => 'Sample location',
        'status' => 'Pending',
    ]);
});

it('can update an event', function () {
    $event = Event::factory()->create([
        'user_id' => $this->user->id,
    ]);

    $updatedData = [
        'title' => 'Updated Event',
        'description' => 'Updated description',
        'event_date' => '2024-12-11',
        'event_time' => '15:00',
        'location' => 'Updated location',
        'status' => 'Completed',
    ];

    $response = $this->put(route('events.update', $event->id), $updatedData);

    $response->assertRedirect(route('events.index'));  
    $this->assertDatabaseHas('events', [
        'title' => 'Updated Event',
        'description' => 'Updated description',
        'status' => 'Completed',
    ]);
});

it('can delete an event', function () {
    $event = Event::factory()->create([
        'user_id' => $this->user->id,
    ]);

    $response = $this->delete(route('events.destroy', $event->id));

    $response->assertRedirect()->with('success', 'You have successfully Deleted the event.');
    $this->assertDatabaseMissing('events', ['id' => $event->id]);
});

it('can join an event', function () {
    $event = Event::factory()->create();
    $user = User::factory()->create(); 
    $this->actingAs($user);

    $response = $this->post(route('events.join', $event->id));  
    $response->assertRedirect()->with('success', 'You have successfully joined the event.'); 
    $event->load('users'); 
    $this->assertTrue($event->users->contains($user)); 
});

it('cannot join an event twice', function () {
    $event = Event::factory()->create();
    $event->users()->attach($this->user);  

    $response = $this->post(route('events.join', $event->id));

    $response->assertRedirect()->with('error', 'You have already joined this event.');
});
