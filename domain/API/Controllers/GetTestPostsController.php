<?php

namespace Domain\API\Controllers;

use Domain\API\Classes\ApiJsonResponse;
use Illuminate\Http\JsonResponse;

class GetTestPostsController
{
	public function __invoke(): JsonResponse
	{
		return ApiJsonResponse::make()
			->setData([
				"posts" => [
					[
						"id" => 0,
						"title" => "Escape from jungle and bees.",
						"author" => "The Jungle Man",
					],
					[
						"id" => 1,
						"title" => "The mighty koala jumped over the rock.",
						"author" => "The Bear",
					],
					[
						"id" => 2,
						"title" => "Please don't read this. Thanks.",
						"author" => "Detective Jack Jackdons",
					],
				],
			])
			->export();
	}
}
