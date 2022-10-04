<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
	public function logout(
		Request $request
	): Redirector|Application|RedirectResponse {
		Auth::logout();

		$request->session()->invalidate();

		$request->session()->regenerateToken();

		return redirect("/");
	}
}
