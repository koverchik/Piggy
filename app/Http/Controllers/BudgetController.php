<?php

namespace App\Http\Controllers;

use App\Http\Requests\BudgetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller
{
    public function index()
    {
        return view('budget.create');
    }
    public function handBudgetCreate(BudgetRequest $request): Request
    {
        DB::table('name_budgets')->insert([
            'name' => $request->get('name'),
            'user_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
        return $request;
    }

    public function list()
    {
        $wallets = DB::table('name_budgets')->paginate(10);

        return view('budget.list', ['header' => "Budgets", 'items' => $wallets]);
    }
}
