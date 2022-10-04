<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use App\Models\Question;
use App\Models\QuestionAnswer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Domain\Room\Enums\RoomVisibilityEnum;
use Illuminate\Support\Str;

class DemoSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		/** @var User $userA */
		$userA = User::factory()->create([
			"email" => "a@a",
			"password" => bcrypt("a"),
		]);

		/** @var User $userB */
		$userB = User::factory()->create([
			"name" => "Petras",
			"email" => "teacher@roctilburg.nl",
			"password" => bcrypt("SE123!"),
		]);

		$userDemo = User::factory()->create([
			"name" => "Demo",
			"email" => "demo@roctilburg.nl",
			"password" => bcrypt("Demo123!"),
		]);

		Room::factory(8)->create([
			"user_id" => $userA->id,
		]);

		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Mathematics",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Robotics",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Geography",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Engineering",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Biology",
		]);

		$room = Room::create([
			"room_type_id" => 1,
			"user_id" => $userDemo->id,
			"name" => "Garage demo",
			"description" => "Demo room",
			"visibility" => RoomVisibilityEnum::PUBLIC,
			"access_code" => Str::upper(Str::random(6)),
		]);

		$questions = collect([
			[
				"question" => "What color is a banana?",
				"answers" => ["Yellow", "Blue", "Green", "Red"],
			],
			[
				"question" => "What's the capital of Sweden?",
				"answers" => ["Stockholm", "Copenhagen", "Madrid", "Oslo"],
			],
			[
				"question" => "How many milimeters is 1 meter?",
				"answers" => ["1000", "10", "100", "10000"],
			],
			[
				"question" => "How many sides does a cube have?",
				"answers" => ["6", "8", "4", "16"],
			],
			[
				"question" => "In which continent is Sri Lanka located?",
				"answers" => ["Asia", "South", "America", "Africa"],
			],
			[
				"question" => "What animal is Garfield?",
				"answers" => ["Cat", "Dog", "Donkey", "Elephant"],
			],
			[
				"question" => "How did Pompeii come to it's end?",
				"answers" => [
					"Volcano eruption",
					"Taken over",
					"Plague",
					"It never did",
				],
			],
			[
				"question" => "What is 12 x 4 - 4?",
				"answers" => ["44", "12", "0", "42"],
			],
			[
				"question" => "Which color isn't one of the Primary colors?",
				"answers" => ["Green", "Blue", "Yellow", "Red"],
			],
			[
				"question" => "What is the biggest ocean in the world?",
				"answers" => ["Pacific", "Atlantic", "Indian", "Arctic"],
			],
			[
				"question" => "How do you call a baby cow?",
				"answers" => ["calf", "puppy", "piglet", "kitten"],
			],
		]);

		$questions->each(function ($question) use ($room) {
			$createdQuestion = Question::create([
				"room_id" => $room->id,
				"question" => $question["question"],
			]);

			collect($question["answers"])->each(function ($answer, $index) use (
				$createdQuestion
			) {
				QuestionAnswer::create([
					"question_id" => $createdQuestion->id,
					"answer" => $answer,
					"is_correct" => $index === 0 ? true : false,
				]);
			});
		});
	}
}
