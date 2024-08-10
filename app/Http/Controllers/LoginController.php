<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
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

    public function handleHomePage()
    {

        $wallets = DB::table('wallets')->limit(10)->get();
        $budgets = DB::table('budgets')->limit(10)->get();

        return view('home', ['wallets' => $wallets, 'budgets' => $budgets]);
    }

}
