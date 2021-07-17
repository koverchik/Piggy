<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Estimates\ListController;
use App\Http\Controllers\Wallets\ListWallets;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/{path?}', function () {
    return view('app');
});

Route::post('/all-estimates', [ListController::class, 'store']);
Route::post('/one-estimates', [ListController::class, 'show']);
Route::post('/delete-estimate', [ListController::class, 'delete']);
Route::post('/write-one-estimates', [ListController::class, 'updateOne']);
Route::post('/new-estimate', [ListController::class, 'create']);

Route::post('/all-wallets', [ListWallets::class, 'store']);
Route::post('/add-new-row-wallet', [ListWallets::class, 'AddNewRow']);
Route::post('/one-wallets', [ListWallets::class, 'show']);
Route::post('/scope-one-wallet', [ListWallets::class, 'scopeOneWallet']);
Route::post('/new-wallet', [ListWallets::class, 'create']);
Route::post('/all-users-system', [ListWallets::class, 'usersSearch']);
Route::post('/add-new-user-wallet', [ListWallets::class, 'addNewUser']);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
