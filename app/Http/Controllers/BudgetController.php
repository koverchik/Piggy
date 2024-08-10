<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRequest;
use App\Models\Budget;
use App\Models\BudgetRows;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller implements TableControllerInterface
{
    public function index(): View
    {
        return view('budget.create');
    }
    public function handlerCreate(CreateRequest $request): Request
    {
        DB::table('budgets')->insert([
            'name' => $request->get('name'),
            'user_id' => 1,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
        return $request;
    }

    public function list(): View
    {
        $budgets = Budget::all()
            ->take(10);

        return view('budget.list', ['header' => "Budgets", 'items' => $budgets, 'type' => 'budget']);
    }

    public function handlerDelete(Request $request): RedirectResponse
    {
        $entityId = $request->get('id');
        $budget = Budget::withTrashed()->find($entityId);
        $budget->forceDelete();
        return back();
    }

    public function handlerMoveToTrash(Request $request): RedirectResponse
    {
        $entityId = $request->get('id');
        $budget = Budget::findOrFail($entityId);
        $budget->delete();
        return back();
    }

    public function trashList(): View
    {
        $budgets = Budget::onlyTrashed()
            ->get();

        return view('budget.list', ['header' => "Budgets", 'items' => $budgets, 'type' => 'budget']);
    }
    public function handlerRestore(Request $request): RedirectResponse
    {
        $entityId = $request->get('id');
        $budget = Budget::onlyTrashed()->findOrFail($entityId);
        $budget->restore();
        return back();
    }

    public function tableView(Request $request, string $id): View
    {
        $budget = Budget::findOrFail($id);
        $total = $budget->data->sum('amount');
        return view('layouts.view-table', ['type' => 'budget', 'items' => $budget, "total" => $total]);
    }

    public function editTable(Request $request, string $id): View
    {
        $budget = Budget::findOrFail($id);
        $total = $budget->data->sum('amount');
        return view('budget.edit', ['type' => 'budget', 'items' => $budget, "total" => $total]);
    }

    public function addRow(Request $request, string $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'budget_id' => 'required|numeric',
            'amount' => 'required|numeric'
        ]);

        $newRow = new BudgetRows;
        $newRow->name = $validatedData['name'];
        $newRow->amount = $validatedData['amount'];
        $newRow->budget_id = $validatedData['budget_id'];
        $newRow->user_id = 1;
        $newRow->save();

        return back();
    }
}
