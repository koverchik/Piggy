<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\Wallet;
use App\Models\WalletMembers;
use App\Traits\CalculateDebitCreditTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\DB;

class WalletController extends Controller implements TableControllerInterface
{
    use CalculateDebitCreditTrait;
    public function index(): View
    {

        $wallets = Wallet::all()
            ->take(10);

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

        WalletMembers::create([
            'wallet_id' => $wallet->id,
            'user_id' => 1,
            'status' => 'approved',
            'permissions' => 'OWNER'
        ]);

        return redirect()->route('wallet.show', ['wallet' => $wallet->id]);
    }

    public function show(Wallet $wallet): View
    {

        $total = $wallet->data->sum('amount');
        $userId = $wallet->owner->id;

        $results =  WalletMembers::select('wallet_members.user_id', DB::raw('SUM(wr.amount) as total_amount'))
            ->leftJoin('wallet_rows as wr', function ($join) {
                $join->on('wallet_members.user_id', '=', 'wr.user_id')
                    ->on('wallet_members.wallet_id', '=', 'wr.wallet_id');
            })
            ->where('wallet_members.wallet_id', $wallet->id)
            ->groupBy('wallet_members.user_id')
            ->get();

        $calculation = $this->calculate($results, $userId);
        $data= $wallet->data()->paginate(10);
        return view('tables.view', ['type' => FinancesType::WALLET->value, 'items' => $wallet, "total" => $total,  'calculation' => $calculation, 'data' => $data]);
    }

    public function edit(Wallet $wallet): View
    {
        return view('layouts.update_entity', ['type' => FinancesType::WALLET->value, 'entity' => $wallet]);
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

    public function trashList(): View
    {
        $wallets = Wallet::onlyTrashed()->get();

        return view('wallet.list', ['items' => $wallets, 'type' => FinancesType::WALLET->value]);
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
