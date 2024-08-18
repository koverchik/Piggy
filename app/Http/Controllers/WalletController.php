<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use App\Models\WalletMembers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;

class WalletController extends Controller implements TableControllerInterface
{

    public function index(): View
    {

        $wallets = Wallet::all()
            ->take(10);
 
        return view('wallet.list', ['items' => $wallets, 'type' => 'wallet']);
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

        WalletMembers::create([
            'wallet_id' => $wallet->id,
            'user_id' => 1,
            'status' => 'approved',
            'permissions' => 'OWNER'
        ]);

        return redirect()->route('wallet.show', ['wallet' => $wallet->id]);
    }

    public function show(string $id): View
    {

        $wallet = Wallet::findOrFail($id);
        $total = $wallet->data->sum('amount');

        return view('tables.view-table', ['type' => "wallet", 'items' => $wallet, "total" => $total]);
    }

    public function edit(string $id): View
    {
        $wallet = Wallet::findOrFail($id);
        return view('layouts.update_entity', ['type' => 'wallet', 'entity' => $wallet]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $wallet = Wallet::findOrFail($id);
        $wallet->name = $validatedData['name'];
        $wallet->save();

        return redirect()->route('wallet.show', $id);
    }

    public function destroy(string $id): RedirectResponse
    {
        $wallet = Wallet::onlyTrashed()->find($id);
        $wallet->forceDelete();

        return redirect()->route('wallet.list.deleted');
    }

    public function trashList(): View
    {
        $wallets = Wallet::onlyTrashed()->get();

        return view('wallet.list', ['header' => "Wallets", 'items' => $wallets, 'type' => 'wallet']);
    }

    public function handlerMoveToTrash(string $id): RedirectResponse
    {
        $wallet = Wallet::findOrFail($id);
        $wallet->status = 'stop';
        $wallet->save();
        $wallet->delete();
        return back();
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
