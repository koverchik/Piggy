<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

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

}
