<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\BudgetRows;
use Illuminate\Http\Request;

class BudgetRowController extends Controller
{

    public function show(string $id)
    {
        $budget = Budget::findOrFail($id);
        $total = $budget->data->sum('amount');

        return view('budget.edit', ['header' => "Budget", 'items' => $budget, "total" => $total, 'type' => "budget"]);
    }

    public function add(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric'
        ]);
        BudgetRows::create([
            'name' => $validatedData['name'],
            'amount' => $validatedData['amount'],
            'budget_id' => $id,
            'user_id' => 1
        ]);

        return back();
    }

}
