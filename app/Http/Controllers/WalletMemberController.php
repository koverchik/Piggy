<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletMember;
use App\Models\WalletRow;
use Illuminate\Contracts\View\View;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class WalletMemberController extends Controller implements MemberControllerInterface
{
    public function show(string $id): View
    {
        $user = Auth::user();
        $wallet = Wallet::find($id);
        $walletMembers = WalletMember::where(['wallet_id' => $wallet->id])->get();

        return view('members.members-table', [
            'type' => FinancesType::WALLET->value,
            'items' => $walletMembers,
            'name' => $wallet->name,
            'id' => $wallet->id,
            'user' => $user
        ]);
    }

    public function deleteUser(string $id, User $user): RedirectResponse
    {
        $wallet = Wallet::find($id);

        if ($wallet) {
            WalletRow::where('wallet_id', $id)
                ->where('user_id', $user->id)
                ->delete();
            $wallet->members()->detach($user->id);
        }

        return back();
    }

}
