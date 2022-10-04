<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomResult>
 */
class RoomResultFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			"name" => "Anonymous",
			"invalid_attempts" => $this->faker->numberBetween(0, 10),
			"completion_time" => $this->faker->numberBetween(4, 45),
		];
	}
}
