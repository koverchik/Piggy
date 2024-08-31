<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\Wallet;
use App\Models\WalletMembers;
use Illuminate\Contracts\View\View;

class WalletMemberController extends Controller
{
    public function show(Wallet $wallet): View
    {
        $walletMembers = WalletMembers::where(['wallet_id' => $wallet->id])->get();

        return view('members.members-table', ['type' => FinancesType::WALLET->value, 'items' => $walletMembers, 'name' => $wallet->name, 'id' => $wallet->id]);
    }
}
