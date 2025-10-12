<?php

use App\Facades\ColorFacade;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\BudgetMemberController;
use App\Http\Controllers\BudgetRowController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RestoreController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\WalletMemberController;
use App\Http\Controllers\WalletRowController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('about');
});

Route::get('/user', function () {
    return view('user');
});

Route::get('/check', function () {
    return ColorFacade::getRandomColor();
});

Route::get('/main', [LoginController::class, 'handleHomePage'])->name('main');

Route::get('/login', [LoginController::class, 'index'])->name('login');

Route::post('/login', [LoginController::class, 'handleLogin'])->name('login.submit');

Route::get('/user/{id}', [UserController::class, 'getUser'])->name('userPage');

Route::post('/upload-avatar/{id}', [UserController::class, 'uploadAvatar'])->name('uploadAvatar');

Route::post('/delete-avatar', [UserController::class, 'deleteAvatar'])->name('delete.avatar');

Route::get('/register', [RegisterController::class, 'index'])->name('register');

Route::post('/register', [RegisterController::class, 'handRegister'])->name('login.register');

Route::get('/restore', [RestoreController::class, 'index'])->name('restore');

Route::post('/restore', [RestoreController::class, 'handRestore'])->name('send.restore');

Route::get('/wallet/members/{wallet}', [WalletMemberController::class, 'show'])->name('members.wallet.table');

Route::delete('/wallet-trash/{wallet}', [WalletController::class, 'handlerMoveToTrash'])->name('wallet.trash');

Route::get('/wallet-list-trash', [WalletController::class, 'trashList'])->name('wallet.list.deleted');

Route::post('/wallet-restore/{wallet}', [WalletController::class, 'handlerRestore'])->name('wallet.restore');

Route::post('/wallet/update/{wallet}', [WalletRowController::class, 'add'])->name('add.wallet.rows');

Route::get('/wallet/update/{wallet}', [WalletRowController::class, 'show'])->name('index.wallet.rows');

Route::resource('/wallet', WalletController::class);

Route::get('/budget/members/{budget}', [BudgetMemberController::class, 'show'])->name('members.budget.table');

Route::delete('/budget-trash/{budget}', [BudgetController::class, 'handlerMoveToTrash'])->name('budget.trash');

Route::get('/budget-list-trash', [BudgetController::class, 'trashList'])->name('budget.list.deleted');

Route::post('/budget-restore/{budget}', [BudgetController::class, 'handlerRestore'])->name('budget.restore');

Route::post('/budget/update/{budget}', [BudgetRowController::class, 'add'])->name('add.budget.rows');

Route::get('/budget/update/{budget}', [BudgetRowController::class, 'show'])->name('index.budget.rows');

Route::resource('/budget', BudgetController::class);
