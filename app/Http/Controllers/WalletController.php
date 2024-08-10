<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRequest;
use App\Models\Wallet;
use App\Models\WalletRows;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\View\View;
use \Illuminate\Http\Response;

class WalletController extends Controller implements TableControllerInterface
{
    public function index(): View
    {

        return view('wallet.create');
    }
    public function handlerCreate(CreateRequest $request): Request
    {

        DB::table('wallets')->insert([
            'name' => $request->get('name'),
            'user_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);

        return $request;
    }

    public function list(): View
    {
        $wallets = Wallet::all()
            ->take(10);

        return view('wallet.list', ['header' => "Wallets", 'items' => $wallets, 'type' => 'wallet']);
    }

    public function trashList(): View
    {
        $wallets = Wallet::onlyTrashed()->get();

        return view('wallet.list', ['header' => "Wallets", 'items' => $wallets, 'type' => 'wallet']);
    }
    public function handlerDelete(Request $request): RedirectResponse
    {
        $entityId = $request->get('id');
        $wallet = Wallet::withTrashed()->find($entityId);
        $wallet->forceDelete();
        return back();
    }

    public function handlerMoveToTrash(Request $request): RedirectResponse
    {
        $entityId = $request->get('id');
        $wallet = Wallet::findOrFail($entityId);
        $wallet->delete();
        return back();
    }

    public function handlerRestore(Request $request): RedirectResponse
    {
        $entityId = $request->get('id');
        $wallet = Wallet::onlyTrashed()->findOrFail($entityId);;
        $wallet->restore();
        return back();
    }

    public function tableView(Request $request, string $id): View
    {
        $wallet = Wallet::findOrFail($id);

        $total = $wallet->data->sum('amount');
        return view('layouts.view-table', ['type' => "wallet", 'items' => $wallet, "total" => $total]);
    }

    public function editTable(Request $request, string $id): View
    {
        $wallet = Wallet::findOrFail($id);
        $total = $wallet->data->sum('amount');
        return view('wallet.edit', ['header' => "Wallet", 'items' => $wallet, "total" => $total, 'type' => "wallet"]);
    }

    public function addRow(Request $request, string $id): RedirectResponse
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'wallet_id' => 'required|numeric',
            'amount' => 'required|numeric'
        ]);

        $newRow = new WalletRows;
        $newRow->name = $validatedData['name'];
        $newRow->amount = $validatedData['amount'];
        $newRow->wallet_id = $validatedData['wallet_id'];
        $newRow->user_id = 1;
        $newRow->save();

        return back();
    }
}
