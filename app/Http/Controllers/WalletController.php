<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Enums\InviteStatus;
use App\Enums\UserRole;
use App\Models\Wallet;
use App\Models\WalletMember;
use App\Traits\CalculateDebitCreditTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WalletController extends Controller implements TableControllerInterface
{
    use CalculateDebitCreditTrait;

    public function index(): View
    {
        $user = Auth::user();
        $wallets = $user->walletsOwned()->paginate(10, ['*'], 'wallet');

        return view('wallet.list', ['items' => $wallets, 'type' => FinancesType::WALLET->value]);
    }

    public function trashList(): View
    {
        $user = Auth::user();
        $wallets = $user->walletsOwnedTrashed()->paginate(10, ['*'], 'wallet');

        return view('wallet.list', ['items' => $wallets, 'type' => FinancesType::WALLET->value]);
    }

    public function create(): View
    {
        return view('layouts.create_entity', ['type' => 'wallet']);
    }

    public function store(Request $request): RedirectResponse
    {
        $wallet = Wallet::create([
            'name' => $request->get('name'),
            'owner_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')]);

        WalletMember::create([
            'wallet_id' => $wallet->id,
            'user_id' => 1,
            'status' => 'approved',
            'permissions' => UserRole::OWNER->value
        ]);

        return redirect()->route('wallet.show', ['wallet' => $wallet->id]);
    }

    public function show(Wallet $wallet): View
    {

        $total = $wallet->data->sum('amount');
        $userId = $wallet->owner->id;

        $results = WalletMember::select('wallet_member.user_id', DB::raw('SUM(wr.amount) as total_amount'))
            ->leftJoin('wallet_row as wr', function ($join) {
                $join->on('wallet_member.user_id', '=', 'wr.user_id')
                    ->on('wallet_member.wallet_id', '=', 'wr.wallet_id');
            })
            ->where('wallet_member.wallet_id', $wallet->id)
            ->whereIn('wallet_member.status', [InviteStatus::ADDED_SYSTEM->value, InviteStatus::APPROVED->value])
            ->groupBy('wallet_member.user_id')
            ->get();

        $calculation = $this->calculate($results, $userId);
        $data = $wallet->data()->paginate(10);

        return view('tables.view', [
                'type' => FinancesType::WALLET->value,
                'members' => $wallet->currentMembers()->get(),
                'item' => $wallet,
                'total' => $total,
                'calculation' => $calculation,
                'data' => $data,
                'ownerId' => $userId
            ]
        );
    }

    public function edit(Wallet $wallet): View
    {
        return view('layouts.update-entity', ['type' => FinancesType::WALLET->value, 'entity' => $wallet]);
    }

    public function update(Request $request, Wallet $wallet): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $wallet->name = $validatedData['name'];
        $wallet->save();

        return redirect()->route('wallet.show', $wallet);
    }

    public function destroy(string $id): RedirectResponse
    {
        $wallet = Wallet::onlyTrashed()->find($id);
        $wallet->forceDelete();

        return redirect()->route('wallet.list.deleted');
    }

    public function handlerMoveToTrash(string $id): RedirectResponse
    {
        $wallet = Wallet::findOrFail($id);
        $wallet->status = 'stop';
        $wallet->save();
        $wallet->delete();

        return redirect()
            ->route('wallet.list.deleted')
            ->with('info', sprintf('The table "%s" has been moved to the trash. You can restore it or delete it.', $wallet->name));
    }

    public function handlerRestore(string $id): RedirectResponse
    {
        $wallet = Wallet::onlyTrashed()->findOrFail($id);
        $wallet->status = 'collect';
        $wallet->save();
        $wallet->restore();

        return redirect()->route('wallet.list.deleted');
    }
}
