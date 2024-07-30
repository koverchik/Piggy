<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('user', function () {
    return view('user');
});

Route::get('about', function () {
    return view('about');
});
