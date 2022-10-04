<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Room;
use App\Models\RoomResult;
use App\Models\RoomOpenEvent;
use Carbon\CarbonImmutable;
use Domain\Room\Enums\RoomVisibilityEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Room\Models\Room>
 */
class RoomFactory extends Factory
{
	public function configure(): RoomFactory
	{
		return $this->afterCreating(function (Room $room) {
			Question::factory(10)->create([
				"room_id" => $room->id,
			]);

			if ($this->faker->boolean) {
				RoomOpenEvent::factory(
					$this->faker->numberBetween(1, 6)
				)->create([
					"room_id" => $room->id,
				]);
			}

			RoomResult::factory($this->faker->numberBetween(0, 10))->create([
				"room_id" => $room->id,
			]);
		});
	}

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		$startDateTime = $this->faker->boolean
			? CarbonImmutable::now()->addDays(
				$this->faker->numberBetween(-6, 5)
			)
			: null;
		$endDateTime = $startDateTime?->addDays(
			$this->faker->numberBetween(1, 6)
		);

		return [
			"name" => (string) Str::of($this->faker->text(30))->replaceLast(
				".",
				""
			),
			"description" => $this->faker->text(150),
			"visibility" => $this->faker->randomElement(
				RoomVisibilityEnum::cases()
			),
			"access_code" =>
				$this->faker->regexify("[A-Z]{2}") .
				$this->faker->numberBetween(1000, 9999),
			"room_type_id" => $this->faker->numberBetween(1, 2),
			"started_at" => $startDateTime?->toDateTimeString(),
			"ended_at" => $endDateTime?->toDateTimeString(),
		];
	}
}
