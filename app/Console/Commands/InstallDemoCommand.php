<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class InstallDemoCommand extends Command
{
	protected $signature = "install:demo";

	protected $description = "Installs demonstration data";

	public function handle(): int
	{
		$this->call("migrate:fresh");

		$this->call("db:seed", ["class" => "DemoSeeder"]);

		return 0;
	}
}
