<?php

namespace Domain\API\Controllers;

use App\Models\Room;
use Domain\API\Classes\ApiJsonResponse;
use Domain\API\Requests\ReceiveRoomResultsRequest;
use Illuminate\Http\JsonResponse;

class ReceiveRoomResultsController
{
	public function __invoke(
		ReceiveRoomResultsRequest $request,
		Room $room
	): JsonResponse {
		/** @var array{
		 *     name: string,
		 *     invalidAttempts: int
		 *     completionTime: int
		 * } $validated
		 */
		$validated = $request->validated();

		$room->results()->create([
			"name" => $validated["name"],
			"invalid_attempts" => $validated["invalidAttempts"],
			"completion_time" => $validated["completionTime"],
		]);

		return ApiJsonResponse::make()->export();
	}
}
