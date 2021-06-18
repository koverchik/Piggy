<?php

namespace App\Http\Controllers\Wallets;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ScopeDiscription;
use App\Models\NamesWallet;
use App\Models\RowWallets;

class ListWallets extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $id)
    {

        // $array = ScopeDiscription::with('Autor')->where("names_wallets_id", 1)->get();
        // $array = RowWallets::with('Autor')->where("names_wallets_id", 1)->get();
        // $comments = RowWallets::find(1)->NamesWallet;
        // $names = NamesWallet::where('id', $id["id"])->get();
        // // dd($array);
        // $test = RowWallets::with('Autor')->where("names_wallets_id", 1)->get();
        // foreach ($test as $one) {
        //     dd($one->Autor);
            
        //     $test= $one;
        //     $name->full_name = $name->NamesWallet->name;
        //     $name->ouner_id = $name->NamesWallet->user_id; 
        //   }
        // return $wallet->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $id)
    {
        //Показать все кошельки доступные пользователю

        $names = ScopeDiscription::with('NamesWallet')->where('user_id', $id["id"])->get();
            
        return $names;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $id)
    {
        $wallet = NamesWallet::where('id', $id["id"])->get();
        $walletRows = RowWallets::with('Autor')->where('names_wallets_id', $id["id"])->get();
        array_add($wallet, 'rows', $walletRows);   
        return $wallet->toJson();
    }

    public function scopeOneWallet(Request $id)
    {
        $names = ScopeDiscription::with('User')->where('names_wallets_id', $id["id"])->get();
        return $names;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function AddNewRow(Request $data)
    {
        $id = 9; 
        $RowWallets = new RowWallets;
        $RowWallets -> name = $data->data["name"];
        $RowWallets -> amount = $data->data["cost"];
        $RowWallets -> created_at_time = $data->data["date"];
        $RowWallets -> user_id = $id;
        $RowWallets -> names_wallets_id = $data->data["namesWalletsId"];
        $RowWallets->save();
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}