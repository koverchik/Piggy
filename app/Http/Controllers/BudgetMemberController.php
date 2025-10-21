<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Models\Budget;
use App\Models\BudgetMember;
use App\Models\BudgetRow;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class BudgetMemberController extends Controller implements MemberControllerInterface
{
    public function show(string $id): View
    {
        $user = Auth::user();
        $budget = Budget::find($id);
        $budgetMembers = BudgetMember::where(['budget_id' => $budget->id])->get();

        return view('members.members-table', [
            'type' => FinancesType::BUDGET->value,
            'items' => $budgetMembers,
            'name' => $budget->name,
            'id' => $budget->id,
            'user' => $user]
        );
    }

    public function deleteUser(string $id, User $user): RedirectResponse
    {
        $budget = Budget::find($id);

        if ($budget) {
            BudgetRow::where('budget_id', $id)
                ->where('user_id', $user->id)
                ->delete();
            $budget->members()->detach($user->id);
        }

        return back();
    }
}
