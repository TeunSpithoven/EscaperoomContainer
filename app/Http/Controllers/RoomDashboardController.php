<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomResult;
use App\Models\RoomOpenEvent;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoomDashboardController extends Controller
{
	public function index(Room $room): Response
	{
		$user = auth()->user();
		$room = $user->rooms()->findOrFail($room->id);
		return Inertia::render("Rooms/RoomDashboard", [
			"room" => $user
				->rooms()
				->with("roomType")
				->findOrFail($room->id),
			"questionCount" => $room->questions()->count(),
			"results" => $room
				->results()
				->orderBy("created_at")
				->get(),
			"roomsOpened" => $room->openEvents()->count(),
		]);
	}
}
