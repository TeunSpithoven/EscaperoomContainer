<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Room\Models\QuestionAnswer>
 */
class QuestionAnswerFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			"answer" => (string) Str::of($this->faker->text(20))->replaceLast(
				".",
				""
			),
		];
	}
}
