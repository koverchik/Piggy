<?php

use App\Http\Controllers\LoginController;
use App\Http\Middleware\EnsureTokenIsValid;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/user', function () {
    return view('user');
});

Route::get('/about', function () {
    return view('about');
});

Route::get('/login', [LoginController::class, 'index'])->name('login');

Route::get('/register', [LoginController::class, 'register'])->name('register');

Route::post('/login', [LoginController::class, 'handleLogin'])->name('login.submit');

Route::post('/register', [LoginController::class, 'handRegister'])->name('login.register');
