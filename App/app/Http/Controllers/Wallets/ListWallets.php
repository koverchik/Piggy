<?php

namespace App\Http\Controllers\Wallets;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ScopeDiscription;
use App\Models\NamesWallet;
use App\Models\RowWallets;
use App\Models\User;

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
    public function create(Request $data)
    {

        $NamesWallet = new NamesWallet;
        $NamesWallet -> name = $data['name'];
        $NamesWallet -> user_id = $data['idUser'];
        $NamesWallet->save();
        $idNewWallet = $NamesWallet->id;
        $ScopeDescription = new ScopeDiscription;
        $ScopeDescription -> delete_table = 1;
        $ScopeDescription -> edit_permission = 1;
        $ScopeDescription -> edit_row = 1;
        $ScopeDescription -> browsing = 1;
        $ScopeDescription -> add_row = 1;
        $ScopeDescription -> delete_row = 1;
        $ScopeDescription -> names_wallets_id = $idNewWallet;
        $ScopeDescription -> user_id = $data['idUser'];
        $ScopeDescription->save();
        $dataNewWallet = array(
            "id" => $idNewWallet,
            "name"  => $data['name'],
        );
        return $dataNewWallet;
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
        $response = [];
        $names = ScopeDiscription::where('user_id', $id["id"])->get();
        foreach ($names as $name) {
            array_push($response, array("name" => $name->NamesWallet->name, "id" => $name->names_wallets_id));   
        }
        return $response;
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

    public function usersSearch(Request $data)
    {
        $allUsers = collect(User::get());
        $usersOneWallet = ScopeDiscription::with('User')->where('names_wallets_id',  $data["id"])->get();
        $userWallet = array_flatten($usersOneWallet->map(function ($user) {
            return collect($user->user->toArray())
                ->only(["id"])
                ->all();
        }));
        $filtered = array_flatten($allUsers->whereNotIn('id', $userWallet));
        return $filtered;
    }

    public function addNewUser(Request $data)
    {
        $ScopeDescription = new ScopeDiscription;
        $ScopeDescription -> user_id = $data['newUser'];
        $ScopeDescription -> names_wallets_id = $data['id'];
        $ScopeDescription -> browsing = 1;
        $ScopeDescription -> add_row = 1;
        if($data['AccessNewUser'] === "owner"){
            $ScopeDescription -> edit_permission = 1;
            $ScopeDescription -> edit_row = 1;
            $ScopeDescription -> delete_row = 1;
            $ScopeDescription -> delete_table = 1;
        }
        if($data['AccessNewUser'] === "editor"){
            $ScopeDescription -> edit_permission = 0;
            $ScopeDescription -> delete_table = 0;
            $ScopeDescription -> edit_row = 1;
            $ScopeDescription -> delete_row = 1;
        }
        if($data['AccessNewUser'] === "user"){
            $ScopeDescription -> edit_permission = 0;
            $ScopeDescription -> delete_table = 0;
            $ScopeDescription -> edit_row = 0;
            $ScopeDescription -> delete_row = 0;
        }
        $ScopeDescription->save();
    }

}