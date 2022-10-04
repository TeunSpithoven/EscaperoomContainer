<?php

namespace App\Http\Controllers;

use App\Models\RoomResult;
use App\Models\RoomOpenEvent;
use App\Models\RoomType;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\CarbonImmutable;
use Carbon\CarbonPeriod;

class DashboardController extends Controller
{
	public function index(): Response
	{
		$user = auth()->user();

		$rooms = $user->rooms()->pluck("id", "name");
		$roomIds = $rooms->values();
		$roomsOpenedCount = RoomOpenEvent::whereIn(
			"room_id",
			$roomIds
		)->count();

		$now = CarbonImmutable::now();
		$weekStartDate = $now->startOfWeek()->format("Y-m-d");
		$weekEndDate = $now->endOfWeek()->format("Y-m-d");
		$period = CarbonPeriod::create($weekStartDate, "1 day", $weekEndDate);

		$roomsCompletedCount = RoomResult::whereIn(
			"room_id",
			$roomIds
		)->count();

		$averageTime = RoomResult::whereIn("room_id", $roomIds)->avg(
			"completion_time"
		);

		$roomTypes = RoomType::all();

		$roomsStartedPerType = $roomTypes->map(function ($roomType) use (
			$period,
			$user
		) {
			$roomOpened = collect([]);

			foreach ($period as $key => $date) {
				$roomOpened->push(
					RoomOpenEvent::whereIn(
						"room_id",
						$roomType->rooms
							->where("user_id", $user->id)
							->pluck("id")
					)
						->where(
							"created_at",
							">=",
							$date->setTime(0, 0, 0)->toDateTimeString()
						)
						->where(
							"created_at",
							"<=",
							$date->setTime(23, 59, 59)->toDateTimeString()
						)
						->count()
				);
			}
			return [
				"roomType" => $roomType,
				"roomsOpenedThisWeek" => $roomOpened,
			];
		});

		$averageTimeSpentPerType = $roomTypes->map(function ($roomType) use (
			$user
		) {
			return [
				"roomType" => $roomType,
				"roomLabels" => $roomType->rooms
					->where("user_id", $user->id)
					->pluck("name"),
				"roomTimes" => $roomType->rooms
					->where("user_id", $user->id)
					->pluck("id")
					->map(function ($roomId) {
						return number_format(
							RoomResult::where("room_id", $roomId)->avg(
								"completion_time"
							) ?? 0,
							2
						);
					}),
			];
		});

		return Inertia::render("Dashboard", [
			"roomsOpened" => $roomsOpenedCount,
			"roomsCompleted" => $roomsCompletedCount,
			"averageTime" => number_format($averageTime ?? 0, 2),
			"chartSubtitle" => "From " . $weekStartDate . " to " . $weekEndDate,
			"averageTimeSpentPerType" => $averageTimeSpentPerType->toArray(),
			"roomsStartedPerType" => $roomsStartedPerType->toArray(),
		]);
	}
}
