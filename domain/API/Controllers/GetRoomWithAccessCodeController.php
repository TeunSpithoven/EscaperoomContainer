<?php

namespace Domain\API\Controllers;

use App\Models\Question;
use App\Models\Room;
use Carbon\CarbonImmutable;
use Domain\API\Classes\ApiJsonResponse;
use Illuminate\Http\JsonResponse;

class GetRoomWithAccessCodeController
{
	public function __invoke(Room $room): JsonResponse
	{
		$now = CarbonImmutable::now();

		if ($room->ended_at !== null && $now->isAfter($room->ended_at)) {
			return ApiJsonResponse::make(403)
				->setError("Room is no longer available.")
				->export();
		}

		if ($room->started_at !== null && $now->isBefore($room->started_at)) {
			return ApiJsonResponse::make(403)
				->setError(
					"Room is unavailable until " .
						$room->started_at->toDateTimeString() .
						"."
				)
				->export();
		}

		$questions = $room
			->questions()
			->with("answers")
			->get();

		$room->openEvents()->create();

		return ApiJsonResponse::make()
			->setData([
				"room" => [
					...$room->only(["name", "description"]),
					"type" => $room->roomType->identifier,
					"questions" => $questions->map(
						fn(Question $question) => [
							...$question->only(["id", "question"]),
							"answers" => $question->answers->map->only([
								"id",
								"answer",
								"is_correct",
							]),
						]
					),
				],
			])
			->export();
	}
}
