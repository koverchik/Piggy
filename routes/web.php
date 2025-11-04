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

Route::get('/user', [UserController::class, 'getUser'])->name('user');

Route::get('/user/{user}', [UserController::class, 'getMember'])->name('member');

Route::post('/upload-avatar/{id}', [UserController::class, 'uploadAvatar'])->name('uploadAvatar');

Route::post('/delete-avatar', [UserController::class, 'deleteAvatar'])->name('delete.avatar');

Route::get('/register', [RegisterController::class, 'index'])->name('register');

Route::post('/register', [RegisterController::class, 'handRegister'])->name('login.register');

Route::get('/restore', [RestoreController::class, 'index'])->name('restore');

Route::post('/restore', [RestoreController::class, 'handRestore'])->name('send.restore');

Route::get('/wallet/{wallet}/members', [WalletMemberController::class, 'show'])->name('members.wallet.table');

Route::delete('/wallet/{id}/members/{user}', [WalletMemberController::class, 'deleteUser'])->name('members.wallet.delete');

Route::put('/wallet/{id}/members/add', [WalletMemberController::class, 'invite'])->name('members.wallet.add');

Route::patch('/wallet/{id}/invite/{user}/resend', [WalletMemberController::class, 'resendInvite'])->name('wallet.invite.resend');

Route::get('wallet/{wallet}/invite/{user}/accept', [WalletMemberController::class, 'acceptInvite'])->name('wallet.invite.accept');

Route::get('/wallet/{wallet}/invite/{user}/decline', [WalletMemberController::class, 'declineInvite'])->name('wallet.invite.decline');

Route::patch('/wallet/{id}/members/{user}/permission', [WalletMemberController::class, 'changePermissionUser'])->name('members.wallet.changePermission');

Route::delete('/wallet/trash/{wallet}', [WalletController::class, 'handlerMoveToTrash'])->name('wallet.trash');

Route::get('/wallet/trash', [WalletController::class, 'trashList'])->name('wallet.list.deleted');

Route::post('/wallet/restore/{wallet}', [WalletController::class, 'handlerRestore'])->name('wallet.restore');

Route::post('/wallet/{wallet}/update', [WalletRowController::class, 'add'])->name('add.wallet.rows');

Route::get('/wallet/{wallet}/update', [WalletRowController::class, 'show'])->name('index.wallet.rows');

Route::resource('/wallet', WalletController::class);

Route::get('/budget/{budget}/members', [BudgetMemberController::class, 'show'])->name('members.budget.table');

Route::delete('/budget/{id}/members/{user}', [BudgetMemberController::class, 'deleteUser'])->name('members.budget.delete');

Route::patch('/budget/{id}/members/{user}/permission', [BudgetMemberController::class, 'changePermissionUser'])->name('members.budget.changePermission');

Route::put('/budget/{id}/members/add', [BudgetMemberController::class, 'invite'])->name('members.budget.add');

Route::get('budget/{budget}/invite/{user}/accept', [BudgetMemberController::class, 'acceptInvite'])->name('budget.invite.accept');

Route::get('/budget/{budget}/invite/{user}/decline', [BudgetMemberController::class, 'declineInvite'])->name('budget.invite.decline');

Route::patch('/budget/{id}/invite/{user}/resend', [BudgetMemberController::class, 'resendInvite'])->name('budget.invite.resend');

Route::delete('/budget/trash/{budget}', [BudgetController::class, 'handlerMoveToTrash'])->name('budget.trash');

Route::post('/budget/restore/{budget}', [BudgetController::class, 'handlerRestore'])->name('budget.restore');

Route::post('/budget/{budget}/update', [BudgetRowController::class, 'add'])->name('add.budget.rows');

Route::get('/budget/{budget}/update', [BudgetRowController::class, 'show'])->name('index.budget.rows');

Route::get('/budget/trash', [BudgetController::class, 'trashList'])->name('budget.list.deleted');

Route::resource('/budget', BudgetController::class);
