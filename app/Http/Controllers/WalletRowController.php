<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use App\Models\WalletRows;
use Illuminate\Http\Request;

class WalletRowController extends Controller
{

    public function show(string $id)
    {
        $wallet = Wallet::findOrFail($id);
        $total = $wallet->data->sum('amount');

        return view('wallet.edit', ['header' => "Wallet", 'items' => $wallet, "total" => $total, 'type' => "wallet"]);
    }

    public function add(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric'
        ]);

        WalletRows::create([
            'name' => $validatedData['name'],
            'amount' => $validatedData['amount'],
            'wallet_id' => $id,
            'user_id' => 1
        ]);

        return back();
    }
}
