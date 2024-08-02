<?php

namespace App\Http\Controllers;

use App\Http\Requests\WalletRequest;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index()
    {

        return view('wallet.create');
    }
    public function handWalletCreate(WalletRequest $request): Request
    {
        return $request;
    }
}
