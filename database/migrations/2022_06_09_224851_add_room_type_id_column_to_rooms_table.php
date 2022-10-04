<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table("rooms", function (Blueprint $table) {
			$table
				->foreignId("room_type_id")
				->after("id")
				->constrained();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table("rooms", function (Blueprint $table) {
			$table->dropColumn("room_type_id");
		});
	}
};
