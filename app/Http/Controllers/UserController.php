<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUser(): View
    {
        $user = Auth::user();
        $wallets = $user->walletMemberships()->get();
        $deletedWallets = $user->walletMembershipsTrashed()->get();
        $budgets = $user->budgetMemberships()->get();
        $deletedBudgets = $user->budgetMembershipsTrashed()->get();

        return view('user',
            [
                'user' => $user,
                'wallets' => $wallets,
                'budgets' => $budgets,
                'deletedWallets' => $deletedWallets,
                'deletedBudgets' => $deletedBudgets
            ]);
    }

    public function getMember(int $id): View
    {
        $auth = Auth::user();
        $user = User::findOrFail($id);
        $wallets = $auth->crossWalletWith($id)->get();
        $deletedWallets = $auth->crossWalletTrashedWith($id)->get();
        $budgets = $auth->crossBudgetsWith($id)->get();
        $deletedBudgets = $auth->crossBudgetsTrashedWith($id)->get();

        return view('members.member',  [
            'user' => $user,
            'wallets' => $wallets,
            'budgets' => $budgets,
            'deletedWallets' => $deletedWallets,
            'deletedBudgets' => $deletedBudgets
        ]);
    }

    public function uploadAvatar(Request $request, int $id): RedirectResponse
    {
        $request->validate(['image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']);

        $user = User::findOrFail($id);
        if ($user->avatar !== null) {
            unlink(storage_path('/app/public/avatars/' . $user->avatar));
        }
        $image = $request->file('image')->store('public/avatars');
        $basename = basename($image);
        $user->avatar = $basename;
        $user->save();

        return back();
    }

    public function deleteAvatar(Request $request): RedirectResponse
    {
        $userId = $request->get('id');
        $user = User::findOrFail($userId);
        if ($user->avatar !== null) {
            unlink(storage_path('/app/public/avatars/' . $user->avatar));
            $user->avatar = null;
            $user->save();
        }

        return back();
    }
}
