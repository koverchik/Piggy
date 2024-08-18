<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use App\Models\WalletMembers;
use Illuminate\Contracts\View\View;

class WalletMemberController extends Controller
{
    public function membersView(string $id): View
    {
        $walletMembers = WalletMembers::where(['wallet_id' => $id])->get();
        $wallet = Wallet::findOrFail($id);

        return view('members.members-table', ['type' => 'wallet', 'items' => $walletMembers, 'name' => $wallet->name, 'id' => $id]);
    }
}
