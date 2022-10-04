<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EditRoomController extends Controller
{
	public function index(int $roomId): Response
	{
		$room = Room::with(["questions", "questions.answers"])->findOrFail(
			$roomId
		);
		$roomData = $room->toArray();
		return Inertia::render("Rooms/EditPage", [
			"room" => [
				...$roomData,
				"started_at" => $room->started_at?->toDateTimeString(),
				"ended_at" => $room->ended_at?->toDateTimeString(),
			],
			"roomType" => $room->roomType,
		]);
	}

	public function update(Request $request, $id)
	{
		$roomData = $request->validate([
			"name" => ["required"],
			"description" => ["required"],
			"started_at" => ["nullable", "date_format:Y-m-d H:i:s"],
			"ended_at" => ["nullable", "date_format:Y-m-d H:i:s"],
			"questions" => ["required", "array"],
			"questions.*.value" => ["required"],
			"questions.*.answers" => ["array", "min:4", "max:4"],
			"questions.*.answers.*.value" => ["required"],
			"questions.*.answers.*.isCorrect" => ["required", "boolean"],
		]);
		$user = auth()->user();

		$room = $user->rooms()->findOrFail($id);
		$roomType = $room->roomType;

		if (count($roomData["questions"]) !== $roomType["question_count"]) {
			return back()->withErrors([
				"questions" =>
					"Room of type " .
					$roomType["label"] .
					" must have " .
					$roomType["question_count"] .
					" questions",
			]);
		}

		$room->name = $roomData["name"];
		$room->description = $roomData["description"];
		$room->started_at = $roomData["started_at"];
		$room->ended_at = $roomData["ended_at"];
		$room->save();

		$questionsIds = collect($request["questions"])->pluck("id");

		collect($room->questions)->each(function ($question) use (
			$room,
			$questionsIds
		) {
			if (!$questionsIds->contains($question->id)) {
				$room
					->questions()
					->find($question->id)
					->delete();
			}
		});

		collect($request["questions"])->each(function ($question) use ($room) {
			$updatedQuestion = $room
				->questions()
				->updateOrCreate(
					["id" => $question["id"]],
					["question" => $question["value"]]
				);
			collect($question["answers"])->each(function ($answer) use (
				$updatedQuestion
			) {
				$updatedQuestion->answers()->updateOrCreate(
					["id" => $answer["id"]],
					[
						"answer" => $answer["value"],
						"is_correct" => $answer["isCorrect"],
					]
				);
			});
		});

		return redirect()->route("rooms", ["room" => $room->id]);
	}

	public function delete(Room $room)
	{
		$room->delete();

		return redirect()->route("rooms");
	}
}
