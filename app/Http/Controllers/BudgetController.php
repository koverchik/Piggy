<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Enums\InviteStatus;
use App\Enums\TablesStatus;
use App\Enums\UserRole;
use App\Models\Budget;
use App\Models\BudgetMember;
use App\Traits\CalculateDebitCreditTrait;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller implements TableControllerInterface
{
    use CalculateDebitCreditTrait;

    public function index(): View
    {
        $budgets = Budget::all()
            ->take(10);

        return view('budget.list', ['items' => $budgets, 'type' => FinancesType::BUDGET->value]);
    }

    public function create(): View
    {
        return view('layouts.create_entity', ['type' => FinancesType::BUDGET->value]);
    }

    public function store(Request $request): RedirectResponse
    {
        $budget = Budget::create([
            'name' => $request->get('name'),
            'owner_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')]);

        BudgetMember::create([
            'budget_id' => $budget->id,
            'user_id' => 1,
            'status' => InviteStatus::ADDED_SYSTEM,
            'permissions' => UserRole::OWNER
        ]);

        return redirect()->route('budget.show', ['budget' => $budget->id]);
    }

    public function show(Budget $budget): View
    {
        $total = $budget->data->sum('amount');
        $userId = $budget->owner->id;

        $results = BudgetMember::select('budget_member.user_id', DB::raw('SUM(br.amount) as total_amount'))
            ->leftJoin('budget_row as br', function ($join) {
                $join->on('budget_member.user_id', '=', 'br.user_id')
                    ->on('budget_member.budget_id', '=', 'br.budget_id');
            })
            ->where('budget_member.budget_id', $budget->id)
            ->groupBy('budget_member.user_id')
            ->get();

        $calculation = $this->calculate($results, $userId);
        $data = $budget->data()->paginate(10);

        return view('tables.view', [
                'type' => FinancesType::BUDGET->value,
                'item' => $budget,
                'total' => $total,
                'calculation' => $calculation,
                'data' => $data
            ]
        );
    }

    public function edit(Budget $budget): View
    {
        return view('layouts.update_entity', ['type' => FinancesType::BUDGET->value, 'entity' => $budget]);
    }

    public function update(Request $request, Budget $budget): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $budget->name = $validatedData['name'];
        $budget->save();

        return redirect()->route('budget.show', $budget);
    }

    public function destroy(string $id): RedirectResponse
    {
        $budget = Budget::onlyTrashed()->find($id);
        $budget->forceDelete();

        return redirect()->route('budget.list.deleted');
    }

    public function trashList(): View
    {
        $budget = Budget::onlyTrashed()->get();

        return view('wallet.list', ['items' => $budget, 'type' => FinancesType::BUDGET->value]);
    }

    public function handlerMoveToTrash(string $id): RedirectResponse
    {
        $budget = Budget::findOrFail($id);
        $budget->status = TablesStatus::STOP;
        $budget->save();
        $budget->delete();
        return back();
    }

    public function handlerRestore(string $id): RedirectResponse
    {
        $budget = Budget::onlyTrashed()->findOrFail($id);
        $budget->status = TablesStatus::COLLECT;
        $budget->save();
        $budget->restore();

        return redirect()->route('wallet.list.deleted');
    }
}
