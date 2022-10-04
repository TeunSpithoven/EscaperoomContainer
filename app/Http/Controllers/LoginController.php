<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
	public function authenticate(Request $request): RedirectResponse
	{
		$credentials = $request->validate([
			"email" => ["required", "email"],
			"password" => ["required"],
			"remember" => ["required", "boolean"],
		]);

		if (
			Auth::attempt(
				[
					"email" => $credentials["email"],
					"password" => $credentials["password"],
				],
				$credentials["remember"]
			)
		) {
			$request->session()->regenerate();

			return redirect()->route("dashboard");
		}

		return back()->withErrors([
			"credentials" =>
				"The provided credentials are incorrect or do not exist",
		]);
	}
}
