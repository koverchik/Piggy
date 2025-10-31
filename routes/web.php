<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\BudgetMemberController;
use App\Http\Controllers\BudgetRowController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RestoreController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\WalletMemberController;
use App\Http\Controllers\WalletRowController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LoginController::class, 'handleHomePage'])->name('main');

Route::get('/login', [LoginController::class, 'index'])->name('login');

Route::post('/login', [LoginController::class, 'handleLogin'])->name('login.submit');

Route::get('/unsubscribe', [SubscriptionController::class, 'index'])->name('unsubscribe');

Route::post('/unsubscribe', [SubscriptionController::class, 'unsubscribe'])->name('unsubscribe.submit');

Route::get('/user', [UserController::class, 'getUser'])->name('userPage');

Route::post('/upload-avatar/{id}', [UserController::class, 'uploadAvatar'])->name('uploadAvatar');

Route::post('/delete-avatar', [UserController::class, 'deleteAvatar'])->name('delete.avatar');

Route::get('/register', [RegisterController::class, 'index'])->name('register');

Route::post('/register', [RegisterController::class, 'handRegister'])->name('login.register');

Route::get('/restore', [RestoreController::class, 'index'])->name('restore');

Route::post('/restore', [RestoreController::class, 'handRestore'])->name('send.restore');

Route::get('/wallet/{wallet}/members', [WalletMemberController::class, 'show'])->name('members.wallet.table');

Route::delete('/wallet/{id}/members/{user}', [WalletMemberController::class, 'deleteUser'])->name('members.wallet.delete');

Route::put('/wallet/{id}/members/add', [WalletMemberController::class, 'addUser'])->name('members.wallet.add');

Route::get('/wallet/{wallet}/invite/{user}', [WalletMemberController::class, 'inviteAccept'])->name('wallet.invite.accept');

Route::patch('/wallet/{id}/members/{user}/permission', [WalletMemberController::class, 'changePermissionUser'])->name('members.wallet.changePermission');

Route::delete('/wallet-trash/{wallet}', [WalletController::class, 'handlerMoveToTrash'])->name('wallet.trash');

Route::get('/wallet-list-trash', [WalletController::class, 'trashList'])->name('wallet.list.deleted');

Route::post('/wallet-restore/{wallet}', [WalletController::class, 'handlerRestore'])->name('wallet.restore');

Route::post('/wallet/{wallet}/update', [WalletRowController::class, 'add'])->name('add.wallet.rows');

Route::get('/wallet/{wallet}/update', [WalletRowController::class, 'show'])->name('index.wallet.rows');

Route::resource('/wallet', WalletController::class);

Route::get('/budget/{budget}/members', [BudgetMemberController::class, 'show'])->name('members.budget.table');

Route::delete('/budget/{id}/members/{user}', [BudgetMemberController::class, 'deleteUser'])->name('members.budget.delete');

Route::patch('/budget/{id}/members/{user}/permission', [BudgetMemberController::class, 'changePermissionUser'])->name('members.budget.changePermission');

Route::put('/budget/{id}/members/add', [BudgetMemberController::class, 'addUser'])->name('members.budget.add');

Route::get('/budget/{budget}/invite/{user}', [BudgetMemberController::class, 'inviteAccept'])->name('budget.invite.accept');

Route::delete('/budget-trash/{budget}', [BudgetController::class, 'handlerMoveToTrash'])->name('budget.trash');

Route::get('/budget-list-trash', [BudgetController::class, 'trashList'])->name('budget.list.deleted');

Route::post('/budget-restore/{budget}', [BudgetController::class, 'handlerRestore'])->name('budget.restore');

Route::post('/budget/{budget}/update', [BudgetRowController::class, 'add'])->name('add.budget.rows');

Route::get('/budget/{budget}/update', [BudgetRowController::class, 'show'])->name('index.budget.rows');

Route::resource('/budget', BudgetController::class);
