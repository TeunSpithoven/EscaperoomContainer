<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateTypes extends Command
{
	protected $signature = "generate:types";

	protected $description = "Regenerates model type comments";

	public function handle(): int
	{
		$this->call("ide-helper:generate");
		$this->call("ide-helper:meta");
		$this->call("ide-helper:models", [
			"--dir" => ["domain"],
			"--write" => true,
			"--reset" => true,
		]);

		return 0;
	}
}
