<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RestoreController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/user', function () {
    return view('user');
});

Route::get('/about', [LoginController::class, 'handleHomePage']);

Route::get('/login', [LoginController::class, 'index'])->name('login');

Route::post('/login', [LoginController::class, 'handleLogin'])->name('login.submit');

Route::get('/register', [RegisterController::class, 'index'])->name('register');

Route::post('/register', [RegisterController::class, 'handRegister'])->name('login.register');

Route::get('/restore', [RestoreController::class, 'index'])->name('restore');

Route::post('/restore', [RestoreController::class, 'handRestore'])->name('send.restore');


Route::get('/wallet', [WalletController::class, 'index'])->name('wallet');

Route::get('/wallet-list', [WalletController::class, 'list'])->name('wallet.list');

Route::get('/wallet-list-trash', [WalletController::class, 'trashList'])->name('wallet.list.deleted');

Route::post('/wallet', [WalletController::class, 'handlerCreate'])->name('create.wallet');

Route::post('/wallet-delete', [WalletController::class, 'handlerDelete'])->name('delete.wallet.delete');

Route::post('/wallet-trash', [WalletController::class, 'handlerMoveToTrash'])->name('active.wallet.delete');

Route::get('/budget', [BudgetController::class, 'index'])->name('budget');

Route::post('/budget', [BudgetController::class, 'handlerCreate'])->name('create.budget');

Route::post('/budget-delete', [BudgetController::class, 'handlerDelete'])->name('delete.budget.delete');

Route::post('/budget-trash', [BudgetController::class, 'handlerMoveToTrash'])->name('active.budget.delete');

Route::get('/budget-list', [BudgetController::class, 'list'])->name('budget.list');

Route::get('/budget-list-trash', [BudgetController::class, 'trashList'])->name('budget.list.deleted');
