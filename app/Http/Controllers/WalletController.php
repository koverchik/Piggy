<?php

namespace App\Http\Controllers;

use App\Http\Requests\WalletRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WalletController extends Controller
{
    public function index()
    {

        return view('wallet.create');
    }
    public function handWalletCreate(WalletRequest $request): Request
    {

        DB::table('name_wallets')->insert([
            'name' => $request->get('name'),
            'user_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return $request;
    }

    public function list()
    {
        $wallets = DB::table('name_wallets')->paginate(10);

        return view('wallet.list', ['header' => "Wallets", 'items' => $wallets]);
    }
}
