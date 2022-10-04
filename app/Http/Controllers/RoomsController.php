<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class RoomsController extends Controller
{
	public function index(): Response
	{
		/** @var User $user */
		$user = auth()->user();

		return Inertia::render("Rooms/IndexPage", [
			"rooms" => $user
				->rooms()
				->with("roomType")
				->orderByDesc("created_at")
				->get()
				->toArray(),
		]);
	}
}
