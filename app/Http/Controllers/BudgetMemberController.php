<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\Budget;
use App\Models\BudgetMember;
use Illuminate\Contracts\View\View;

class BudgetMemberController extends Controller
{
    public function show(Budget $budget): View
    {
        $budgetMembers = BudgetMember::where(['budget_id' => $budget->id])->get();

        return view('members.members-table', ['type' => FinancesType::BUDGET->value, 'items' => $budgetMembers, 'name' => $budget->name, 'id' => $budget->id]);
    }
}
