<?php

use Domain\API\Controllers\GetRoomWithAccessCodeController;
use Domain\API\Controllers\GetTestPostsController;
use Domain\API\Controllers\ReceiveRoomResultsController;
use Illuminate\Support\Facades\Route;

Route::get("/test/posts", GetTestPostsController::class);
Route::post(
	"/rooms/{room:access_code}/results",
	ReceiveRoomResultsController::class
);

Route::get("/rooms/{room:access_code}", GetRoomWithAccessCodeController::class);
