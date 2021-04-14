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

Route::get('/', function () {
    return view('app');
});

// Route::resource('/estimate', [EstimatesController::class, 'index']) -> names('estimateTest');
Route::get('/estimate{path?}', [ListController::class, 'show']);

Route::get('/all-estimates{path?}', [ListController::class, 'store']);

// Route::get('/estimate', function () {
//     return view('app');
// });
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
