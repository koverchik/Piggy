<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\Wallet;
use App\Models\WalletRows;
use Illuminate\Http\Request;

class WalletRowController extends Controller
{
    public function show(Wallet $wallet)
    {
        $total = $wallet->data->sum('amount');
        $lastPage = $wallet->data()->paginate(10)->lastPage();
        $data = $wallet->data()->paginate(10, ['*'], 'page', $lastPage);

        return view('wallet.edit', ['items' => $wallet, "total" => $total, 'data' => $data, 'type' => FinancesType::WALLET->value]);
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
