<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Domain\Room\Enums\RoomVisibilityEnum;
use Illuminate\Support\Facades\DB;

class CreateRoomController extends Controller
{
	public function index(): Response
	{
		$roomTypes = RoomType::all();

		return Inertia::render("Rooms/CreatePage", [
			"roomTypes" => $roomTypes->toArray(),
		]);
	}

	public function create(Request $request): RedirectResponse
	{
		/** @var User $user */
		$user = auth()->user();

		$room = $request->validate([
			"name" => ["required"],
			"description" => ["required"],
			"started_at" => ["nullable", "date_format:Y-m-d H:i:s"],
			"ended_at" => ["nullable", "date_format:Y-m-d H:i:s"],
			"room_type" => ["required", "exists:room_types,id", "numeric"],
			"questions" => ["required", "array"],
			"questions.*.value" => ["required"],
			"questions.*.answers" => ["array", "min:4", "max:4"],
			"questions.*.answers.*.value" => ["required"],
			"questions.*.answers.*.isCorrect" => ["required", "boolean"],
		]);

		$roomType = RoomType::findOrFail($room["room_type"]);
		if (count($room["questions"]) !== $roomType["question_count"]) {
			return back()->withErrors([
				"questions" =>
					"Room of type " .
					$roomType["label"] .
					" must have " .
					$roomType["question_count"] .
					" questions",
			]);
		}
		$createdRoom = $user->rooms()->create([
			"name" => $room["name"],
			"description" => $room["description"],
			"started_at" => $room["started_at"],
			"ended_at" => $room["ended_at"],
			"room_type_id" => $roomType["id"],
			"visibility" => "PUBLIC",
			"access_code" => Str::upper(Str::random(6)),
		]);

		collect($request["questions"])->each(function ($question) use (
			$createdRoom
		) {
			$createdQuestion = $createdRoom
				->questions()
				->create(["question" => $question["value"]]);

			collect($question["answers"])->each(function ($answer) use (
				$createdQuestion
			) {
				$createdQuestion->answers()->create([
					"answer" => $answer["value"],
					"is_correct" => $answer["isCorrect"],
				]);
			});
		});

		return redirect()->route("rooms");
	}
}
