<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RestoreController;
use App\Http\Controllers\WalletController;
use App\Http\Middleware\EnsureTokenIsValid;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', [LoginController::class, 'handleLogin'])->name('login.submit');

Route::get('/register', [RegisterController::class, 'index'])->name('register');

Route::post('/register', [RegisterController::class, 'handRegister'])->name('login.register');

Route::get('/restore', [RestoreController::class, 'index'])->name('restore');

Route::post('/restore', [RestoreController::class, 'handRestore'])->name('send.restore');


Route::get('/wallet', [WalletController::class, 'index'])->name('wallet');

Route::post('/wallet', [WalletController::class, 'handWalletCreate'])->name('create.wallet');

Route::get('/budget', [BudgetController::class, 'index'])->name('budget');

Route::post('/budget', [BudgetController::class, 'handBudgetCreate'])->name('create.budget');
