<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Carbon\CarbonImmutable;
use Inertia\Inertia;
use Inertia\Response;

class TimelineController extends Controller
{
	public function index(): Response
	{
		$roomsWithRange = auth()
			->user()
			->rooms()
			->whereNotNull("started_at")
			->where("ended_at", ">=", CarbonImmutable::now()->subDays(30))
			->get();

		return Inertia::render("Timeline", [
			"rooms" => $roomsWithRange->map(
				fn(Room $room) => [
					"name" => $room->name,
					"started_at" => $room->started_at->toDateTimeString(),
					"ended_at" => $room->ended_at->toDateTimeString(),
				]
			),
		]);
	}
}
