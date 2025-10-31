<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Enums\InviteStatus;
use App\Enums\UserRole;
use App\Facades\ColorFacade;
use App\Mail\UserInvited;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletMember;
use App\Models\WalletRow;
use Illuminate\Contracts\View\View;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class WalletMemberController extends Controller implements MemberControllerInterface
{

    public function show(string $id): View
    {
        $user = Auth::user();
        $wallet = Wallet::with('members')->findOrFail($id);

        return view('members.members-table', [
            'type' => FinancesType::WALLET->value,
            'items' => $wallet->members,
            'name' => $wallet->name,
            'id' => $id,
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

    public function changePermissionUser(Request $request, string $id, User $user): RedirectResponse
    {
        $request->validate([
            'permissions' => 'required|string',
        ]);
        $role = UserRole::tryFrom($request->permissions);
        WalletMember::where('wallet_id', $id)
            ->where('user_id', $user->id)
            ->update(['permissions' => $role]);

        return back();
    }

    public function inviteAccept(string $id, User $user): RedirectResponse
    {
        $authUser = Auth::user();
        if (!$authUser) {
            redirect(route('login'));
        }
        $wallet = Wallet::find($id);
        $userIds = $wallet->members()->pluck('users.id')->toArray();
        if (in_array($user->id, $userIds)) {
            return redirect(route('members.wallet.table', ['wallet' => $id]));
        } else {
            return redirect(route('main'));
        }
    }

    public function addUser(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'permissions' => 'required',
            'name' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
           $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'color' => ColorFacade::getRandomColor(),
                'password'=> 'salt'
            ]);
        }

        WalletMember::firstOrCreate([
            'wallet_id' => $id,
            'user_id' => $user->id,
            'status' => InviteStatus::INVITED->value,
            'permissions' => $request->permissions
        ]);
        $host = Auth::user();
        $wallet = Wallet::find($id);
        $acceptUrl = 'url_redirect';
        Mail::to($user->email)
            ->queue(new UserInvited($user, $host, FinancesType::WALLET->value, $wallet->name, $request->permissions, $acceptUrl));

        return back();
    }
}
