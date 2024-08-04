<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRequest;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\View\View;

class WalletController extends Controller implements TableControllerInterface
{
    public function index(): View
    {

        return view('wallet.create');
    }
    public function handlerCreate(CreateRequest $request): Request
    {

        DB::table('name_wallets')->insert([
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
}
