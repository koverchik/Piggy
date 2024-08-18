<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\BudgetMembers;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller implements TableControllerInterface
{

    public function index(): View
    {
        $budgets = Budget::all()
            ->take(10);

        return view('budget.list', ['items' => $budgets, 'type' => 'budget']);
    }

    public function create(): View
    {
        return view('layouts.create_entity', ['type' => 'budget']);
    }

    public function store(Request $request): RedirectResponse
    {
        $budget = Budget::create([
            'name' => $request->get('name'),
            'owner_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')]);

        BudgetMembers::create([
            'budget_id' => $budget->id,
            'user_id' => 1,
            'status' => 'approved',
            'permissions' => 'OWNER'
        ]);

        return redirect()->route('budget.show', ['budget' => $budget->id]);
    }

    public function show(string $id): View
    {

        $budget = Budget::findOrFail($id);
        $total = $budget->data->sum('amount');

        return view('tables.view-table', ['type' => "budget", 'items' => $budget, "total" => $total]);
    }

    public function edit(string $id): View
    {
        $budget = Budget::findOrFail($id);
        return view('layouts.update_entity', ['type' => 'budget', 'entity' => $budget]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $budget = Budget::findOrFail($id);
        $budget->name = $validatedData['name'];
        $budget->save();

        return redirect()->route('budget.show', $id);
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

        return view('wallet.list', ['header' => "Budget", 'items' => $budget, 'type' => 'budget']);
    }

    public function handlerMoveToTrash(string $id): RedirectResponse
    {
        $budget = Budget::findOrFail($id);
        $budget->status = 'stop';
        $budget->save();
        $budget->delete();
        return back();
    }

    public function handlerRestore(string $id): RedirectResponse
    {
        $budget = Budget::onlyTrashed()->findOrFail($id);
        $budget->status = 'collect';
        $budget->save();
        $budget->restore();

        return redirect()->route('wallet.list.deleted');
    }
}
