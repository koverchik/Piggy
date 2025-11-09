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
use Illuminate\Support\Facades\Auth;

class BudgetController extends Controller implements TableControllerInterface
{
    use CalculateDebitCreditTrait;

    public function index(): View
    {
        $user = Auth::user();
        $budgets = $user->budgetsOwned()->paginate(10, ['*'], 'budget');

        return view('budget.list', ['items' => $budgets, 'type' => FinancesType::BUDGET->value]);
    }

    public function trashList(): View
    {
        $user = Auth::user();
        $budgets = $user->budgetsOwnedTrashed()->paginate(10, ['*'], 'budget');

        return view('budget.list', ['items' => $budgets, 'type' => FinancesType::BUDGET->value]);
    }

    public function create(): View
    {
        return view('layouts.create_entity', ['type' => FinancesType::BUDGET->value]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $budget = Budget::create([
            'name' => $request->get('name'),
            'owner_id' => $user->id,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')]);

        BudgetMember::create([
            'budget_id' => $budget->id,
            'user_id' => $user->id,
            'status' => InviteStatus::ADDED_SYSTEM,
            'permissions' => UserRole::OWNER->value
        ]);

        return redirect()->route('budget.show', ['budget' => $budget->id]);
    }

    public function show(Budget $budget): View
    {
        $total = $budget->data->sum('amount');
        $ownerId = $budget->owner->id;
        $calculation = $this->calculate($budget->id, Auth::user()->id, FinancesType::BUDGET->value);
        $data = $budget->data()->paginate(10);

        return view('tables.view', [
                'type' => FinancesType::BUDGET->value,
                'members' => $budget->currentMembers()->get(),
                'item' => $budget,
                'total' => $total,
                'calculation' => $calculation,
                'data' => $data,
                'ownerId' => $ownerId
            ]
        );
    }

    public function edit(Budget $budget): View
    {
        return view('layouts.update-entity', ['type' => FinancesType::BUDGET->value, 'entity' => $budget]);
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



    public function handlerMoveToTrash(string $id): RedirectResponse
    {
        $budget = Budget::findOrFail($id);
        $budget->status = TablesStatus::STOP;
        $budget->save();
        $budget->delete();

        return redirect()
            ->route('budget.list.deleted')
            ->with('info', sprintf('The table "%s" has been moved to the trash. You can restore it or delete it.', $budget->name));
    }

    public function handlerRestore(string $id): RedirectResponse
    {
        $budget = Budget::onlyTrashed()->findOrFail($id);
        $budget->status = TablesStatus::COLLECT;
        $budget->save();
        $budget->restore();

        return redirect()->route('budget.list.deleted');
    }
}
