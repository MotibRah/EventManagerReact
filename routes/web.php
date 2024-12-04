<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ProfileController;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $events = Event::with(['users', 'user'])
        ->whereIn('status', ['pending', 'active'])
        ->paginate(6);

    // Add is_joined attribute to each event
    $events->getCollection()->transform(function ($event) {
        $event->is_joined = $event->users->contains(auth()->id());
        $event->startDate = Carbon::parse($event->event_date)->diffForHumans();
        return $event;
    });
 

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'events' => $events
    ]);
})->name('home');


Route::get('/dashboard', [EventController::class, 'index'])->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('events', EventController::class);

    Route::post('/events/{event}/join', [EventController::class, 'joinEvent'])->name('events.join');
    Route::get('/event_joined', [EventController::class, 'joinedEvent'])->name('events.joined');
    Route::get('/event_leave/{eventId}', [EventController::class, 'leaveEvent'])->name('events.leave');
});

require __DIR__ . '/auth.php';
