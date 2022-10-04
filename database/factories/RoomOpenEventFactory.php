<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Room\Models\RoomOpenEvent>
 */
class RoomOpenEventFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
        $dateTime = $this->faker->dateTimeBetween("-1 days");

		return [
			"created_at" => $dateTime,
			"updated_at" => $dateTime,
		];
	}
}
