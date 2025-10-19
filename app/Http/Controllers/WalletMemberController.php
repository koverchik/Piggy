<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\Wallet;
use App\Models\WalletMember;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;

class WalletMemberController extends Controller
{
    public function show(Wallet $wallet): View
    {
        $user = Auth::user();
        $walletMembers = WalletMember::where(['wallet_id' => $wallet->id])->get();

        return view('members.members-table', [
            'type' => FinancesType::WALLET->value,
            'items' => $walletMembers,
            'name' => $wallet->name,
            'id' => $wallet->id,
            'user' => $user
        ]);
    }
}
