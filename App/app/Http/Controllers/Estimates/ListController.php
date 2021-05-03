<?php

namespace App\Http\Controllers\Estimates;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\NamesEstimates;
use App\Models\RowEstimates;
use App\Models\ScopeEstimates;



class ListController extends BaseController
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $id)
    {
        //Показать все сметы пользователя
   
        $names = ScopeEstimates::where('user_id', $id["id"])->get();
        foreach ($names as $name) {
             $name->full_name = $name->NamesEstimates->name;
             $name->ouner_id = $name->NamesEstimates->user_id;
          }
          
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
        // Получить информацию об одной смете
        $estimate = DB::table('names_estimates')->where("id", $id["id"])->get();
        $estimateRows = DB::table('row_estimates')->where("names_estimates_id", $id["id"])->get();
        array_add($estimate, 'rows', $estimateRows);
        return $estimate->toJson();
    }


    public function delete(Request $data)
    {       
        DB::table('row_estimates')->where('id', '=', $data["id_row"])->delete(); 
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
    public function updateOne(Request $data)
    {

        $RowEstimates = new RowEstimates;
        $RowEstimates -> name = $data['name'];
        $RowEstimates -> amount = $data['cost'];
        $RowEstimates -> user_id = $data['id_user'];
        $RowEstimates -> names_estimates_id = $data['id'];
        $RowEstimates->save();

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
