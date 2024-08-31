<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\Budget;
use App\Models\BudgetRows;
use Illuminate\Http\Request;

class BudgetRowController extends Controller
{

    public function show(Budget $budget)
    {
        $total = $budget->data->sum('amount');
        $lastPage = $budget->data()->paginate(10)->lastPage();
        $data = $budget->data()->paginate(10, ['*'], 'page', $lastPage);

        return view('budget.edit', ['items' => $budget, "total" => $total, 'data' => $data, 'type' => FinancesType::BUDGET->value]);
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
            'user_id' => 3
        ]);

        return back();
    }

}
