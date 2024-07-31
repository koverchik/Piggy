<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class LoginController extends Controller
{
    public function index()
    {
    return view('login');
    }

    public function register()
    {
        return view('register');
    }
    public function handleLogin(Request $request): Request
    {
     $request->validate([
         'email' =>['required', 'email'],
         'password' =>['required', 'min:8']
     ]);

    return $request;
    }

    public function handRegister(Request $request): Request
    {
        $request->validate([
            'name' => ['required', 'alpha_dash'],
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
            'password-confirm' => ['required', 'min:8', 'confirmed']
        ]);

        return $request;
    }
}
