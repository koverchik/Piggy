<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\RestoreRequest;
use Illuminate\Http\Request;

class RestoreController extends Controller
{
    public function index()
    {
        return view('auth.restore');
    }
    public function handRestore(RestoreRequest $request): Request
    {

        return $request;
    }
}
