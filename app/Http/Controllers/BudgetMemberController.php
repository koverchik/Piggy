<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\BudgetMembers;
use Illuminate\Contracts\View\View;

class BudgetMemberController extends Controller
{
    public function membersView(string $id): View
    {
        $budgetMembers = BudgetMembers::where(['budget_id' => $id])->get();
        $budget = Budget::findOrFail($id);

        return view('members.members-table', ['type' => 'wallet', 'items' => $budgetMembers, 'name' => $budget->name, 'id' => $id]);
    }
}
