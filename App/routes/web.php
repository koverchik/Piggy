<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Estimates\ListController;

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

// Route::get('/estimate/{path?}', function () {
//     return view('estimate');
// });

// Route::resource('/estimate', [EstimatesController::class, 'index']) -> names('estimateTest');

// Route::view('/estimate{id?}', 'app', ['id' => 3])->where('id','/\d+/');

// Route::view('/estimate{id?}', 'app')->where('id','/\d+/');

// Route::get('/estimate{id}', function ($id) {
//     return view('app');
// });

//Получить список всех смет для одного пользователя

Route::post('/all-estimates', [ListController::class, 'store']);

Route::post('/one-estimates', [ListController::class, 'show']);

Route::post('/delete-estimate', [ListController::class, 'delete']);

Route::post('/write-one-estimates', [ListController::class, 'updateOne']);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
