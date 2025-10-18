<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
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
            return back()->withErrors(['email' => 'Invalid credentials.']);
        }
        Auth::login($user);

        return redirect()->route('userPage');
    }

    public function handleHomePage(): View
    {
        $user = Auth::user();

        $wallets = $user->walletMemberships()->paginate(10, ['*'], 'budget');
        $budgets = $user->budgetMemberships()->paginate(10, ['*'], 'budget');

        return view('home', compact('wallets', 'budgets'));
    }

}
