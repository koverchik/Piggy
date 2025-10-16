<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Budget;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function index()
    {

    return view('auth.login');
    }

    public function handleLogin(LoginRequest $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return back();
        }

        return redirect()->route('userPage',['id' => $user->id]);
    }

    public function handleHomePage(): View
    {

        $wallets = Wallet::paginate(10, ['*'], 'wallet');
        $budgets = Budget::paginate(10, ['*'], 'budget');

        return view('home', compact('wallets', 'budgets'));
    }

}
