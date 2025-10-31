<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function handleLogin(LoginRequest $request): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
        ]);

        if ($validator->fails()) {
            return redirect()->route('login')
                ->withErrors($validator, 'login')
                ->withInput();
        }

        $validated = $validator->validated();

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return back()->withErrors(['email' => 'Invalid credentials.'], 'login')->withInput();
        }

        Auth::login($user);

        return redirect()->route('userPage');
    }

    public function handleHomePage(): View
    {
        $user = Auth::user();
        if ($user) {
            $wallets = $user->walletMemberships()->paginate(10, ['*'], 'wallet');
            $budgets = $user->budgetMemberships()->paginate(10, ['*'], 'budget');

            return view('home', compact('wallets', 'budgets'));
        } else {
            return view('about');
        }
    }

}
