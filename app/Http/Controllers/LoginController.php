<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Budget;
use App\Models\Wallet;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function index()
    {

    return view('auth.login');
    }

    public function handleLogin(LoginRequest $request): Request
    {

    return $request;
    }

    public function handleHomePage(): View
    {

        $wallets = Wallet::paginate(10, ['*'], 'wallet');
        $budgets = Budget::paginate(10, ['*'], 'budget');

        return view('home', compact('wallets', 'budgets'));
    }

}
