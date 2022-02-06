<?php

namespace App\Http\Controllers\Wallets;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\ScopeDescription;
use App\Models\ObligationsWallets;
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
        $ScopeDescription = new ScopeDescription;
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
        $names = ScopeDescription::where('user_id', $id["id"])->get();
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
        $walletRows = RowWallets::with('Autor')->where('names_wallets_id', $id["id"])->get(['id','name', 'amount', 'user_id', 'created_at_time']);
  
      return array("name" => $wallet[0]-> name, "rows" => $walletRows);
    }

    public function scopeOneWallet(Request $id)
    {
        $names = ScopeDescription::with('User')->where('names_wallets_id', $id["id"])->get(['user_id',  'id', 'edit_row', 'edit_permission', 'delete_table', 'delete_row', 'browsing']);
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
        $walletRow = RowWallets::with('Autor')->where('names_wallets_id', $RowWallets -> names_wallets_id)->where('id', $RowWallets -> id)->get(['id','name', 'amount', 'user_id', 'created_at_time']);
        return $walletRow[0];
    }

    public function debitCredit(Request $data)
    {  
        $usersWallet = ObligationsWallets::with(['Author'])->where('names_wallets_id', $data['id'])->get();
        $userTable = [];
   
        foreach ($usersWallet as &$value) {
            array_push($userTable, ["user_id" => $value-> user_id, "name" => $value->Author->name, "debit"=>  0,  "credit" =>  0]);    
        }
         $lengthUsersArray = count($userTable);
        $rowWallet = RowWallets::where('names_wallets_id', $data['id'])->get(['amount', 'user_id']);
        foreach ($rowWallet as &$row) {
            foreach ($userTable  as &$user) {
                if($row['user_id'] === $user['user_id']){
                $user['debit'] = $user['debit'] + ($row['amount'] - $row['amount']/($lengthUsersArray));
                $user['credit'] = $user['credit'] - ($row['amount'] - $row['amount']/($lengthUsersArray));
                    }
                    else{
                        $user['debit'] = $user['debit'] - $row['amount']/($lengthUsersArray);
                        $user['credit'] = $user['credit'] + $row['amount']/($lengthUsersArray);
                    }
                }
        }

        return $userTable;
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
        $allUsers = collect(User::get(['id', 'name', 'email']));
        $usersOneWallet = ScopeDescription::with('User')->where('names_wallets_id',  $data["id"])->get();
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
        DB::transaction(function() use ($data) {
                    $ScopeDescription = new ScopeDescription;
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
                    $ObligationsWallets = new ObligationsWallets;
                    $ObligationsWallets -> user_id = $data['newUser'];
                    $ObligationsWallets -> names_wallets_id = $data['id'];
                    $ObligationsWallets->save();
                    $newUser = ScopeDescription::with('User')->where('user_id', $data['newUser'])->get(['user_id',  'id', 'edit_row', 'edit_permission', 'delete_table', 'delete_row', 'browsing'])->unique('user_id');
                    return $newUser[0];
    }, 3);
    }

}