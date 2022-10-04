<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\RoomType;

return new class extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create("room_types", function (Blueprint $table) {
			$table->id();
			$table->string("identifier");
			$table->string("label");
			$table->integer("question_count");
			$table->string("rgb_color");
			$table->timestamps();
		});

		/**
		 * Add room types here instead of in seeds, because room types must exist regardless
		 * if you run seeds or not
		 */
		RoomType::create([
			"identifier" => "garage",
			"label" => "Garage",
			"question_count" => 11,
			"rgb_color" => "190, 24, 93",
		]);

		RoomType::create([
			"identifier" => "laboratory",
			"label" => "Laboratory",
			"question_count" => 11,
			"rgb_color" => "53, 162, 235",
		]);
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists("room_types");
	}
};
