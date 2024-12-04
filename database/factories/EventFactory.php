<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'event_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'location' => $this->faker->address,
            'status' => $this->faker->randomElement(['Active', 'Pending', 'Completed']),
            'user_id' => User::factory(), 
        ];
    }
}
