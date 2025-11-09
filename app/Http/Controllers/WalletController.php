<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Enums\UserRole;
use App\Models\Wallet;
use App\Models\WalletMember;
use App\Traits\CalculateDebitCreditTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;

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
        $user = Auth::user();
        $wallet = Wallet::create([
            'name' => $request->get('name'),
            'owner_id' => $user->id,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')]);

        WalletMember::create([
            'wallet_id' => $wallet->id,
            'user_id' => $user->id,
            'status' => 'approved',
            'permissions' => UserRole::OWNER->value
        ]);

        return redirect()->route('wallet.show', ['wallet' => $wallet->id]);
    }

    public function show(Wallet $wallet): View
    {
        $calculation = $this->calculate($wallet->id, (int) Auth::user()->id, FinancesType::WALLET->value);
        $data = $wallet->data()->paginate(10);

        return view('tables.view', [
                'type' => FinancesType::WALLET->value,
                'members' => $wallet->currentMembers()->get(),
                'item' => $wallet,
                'total' => $wallet->data->sum('amount'),
                'calculation' => $calculation,
                'data' => $data,
                'ownerId' => $wallet->owner->id
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
