<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function index(): View
    {
        $user = Auth::user();
        if ($user) {
            return view('subscription.unsubscribe');
        } else {
            return view('auth.login');
        }
    }

    public function unsubscribe(): RedirectResponse
    {
        $user = Auth::user();
        $user->update(['subscription' => false]);

        return redirect()->route('main');
    }
}
