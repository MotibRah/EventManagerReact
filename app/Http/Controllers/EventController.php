<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventCreateRequest;
use App\Http\Resources\EventResource;
use App\Http\Resources\SingleEventResource;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::where('user_id', Auth::user()->id)->latest()->get();
        return Inertia::render('Dashboard', [
            'events' => EventResource::collection($events)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/Create');
    }

    public function store(EventCreateRequest $request)
    {
        // Validate the incoming data
        $validated = $request->validated();

        // Combine event date and event time into a timestamp
        $eventDateTime = $validated['event_date'] . ' ' . $validated['event_time'];
        $timestamp = Carbon::parse($eventDateTime)->toDateTimeString();

        // Store the event with the timestamp
        Event::create([
            'user_id' => Auth::user()->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'event_date' => $timestamp,  // Store the timestamp in the database
            'location' => $validated['location'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('events.index')->with('success', 'Event created successfully!');
    }

    public function update(EventCreateRequest $request, Event $event)
    {
        // Validate the incoming data
        $validated = $request->validated();

        // Combine event date and event time into a timestamp
        $eventDateTime = $validated['event_date'] . ' ' . $validated['event_time'];
        $timestamp = \Carbon\Carbon::parse($eventDateTime)->toDateTimeString();

        // Update the event with the new timestamp
        $event->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'event_date' => $timestamp,  // Store the timestamp in the database
            'location' => $validated['location'],
            'status' => $validated['status'],
        ]);

        return redirect()->route('events.index')->with('success', 'Event updated successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Retrieve the event by ID
        $event = Event::findOrFail($id);

        // Return the event data to Inertia, wrapped in a SingleEventResource
        return inertia('Events/Show', [
            'event' => new SingleEventResource($event), // Wrap the event instance directly in the resource
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $event = Event::findOrFail($id);

        // Return the event data to Inertia
        return inertia('Events/Create', [
            'event' => $event,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::findOrFail($id);

        if ($event->user_id !== Auth::user()->id) {
            return redirect()->route('events.index')->with('error', 'You are not authorized to delete this event.');
        }

        // Delete the event
        $event->delete();
        return redirect()->back()->with('success', 'You have successfully Deleted the event.');
    }
    public function joinedEvent()
    {
        // Fetch events that the authenticated user has joined
        $events = Event::whereHas('users', function ($query) {
            $query->where('user_id', Auth::user()->id); // Ensure the user has joined the event
        })
            ->with(['users', 'user']) // Eager load the 'users' and 'user' relationships
            ->get(); // Paginate the results (adjust as needed)


        return inertia('Events/Joined', [
            'events' =>  EventResource::collection($events), // Wrap the event instance directly in the resource
        ]);
    }


    // In your EventController
    public function joinEvent($eventId)
    {
        $user = Auth::user();
        $event = Event::findOrFail($eventId);

        // Check if the user has already joined the event
        if ($event->users()->where('user_id', $user->id)->exists()) {
            return redirect()->back()->with('error', 'You have already joined this event.');
        }

        // Attach the user to the event
        $event->users()->attach($user->id);

        return redirect()->back()->with('success', 'You have successfully joined the event.');
    }

    public function leaveEvent($eventId)
    {
        $user = Auth::user();
        $event = Event::findOrFail($eventId);

        // Check if the user has joined the event
        if (!$event->users()->where('user_id', $user->id)->exists()) {
            return redirect()->back()->with('error', 'You have not joined this event.');
        }

        // Detach the user from the event
        $event->users()->detach($user->id);

        return redirect()->back()->with('success', 'You have successfully left the event.');
    }
}
