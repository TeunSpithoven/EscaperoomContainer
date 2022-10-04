<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\QuestionAnswer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Room\Models\Question>
 */
class QuestionFactory extends Factory
{
	public function configure(): QuestionFactory
	{
		return $this->afterCreating(function (Question $question) {
			$amount = 4;
			$correctAnswerIndex = 0;

			for ($index = 0; $index < $amount; $index++) {
				QuestionAnswer::factory()->create([
					"question_id" => $question->id,
					"is_correct" => $correctAnswerIndex === $index,
				]);
			}
		});
	}

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			"question" => (string) Str::of($this->faker->text(80))->replaceLast(
				".",
				"?"
			),
		];
	}
}
