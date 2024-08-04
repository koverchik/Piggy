<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRequest;
use App\Models\Budget;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudgetController extends Controller implements TableControllerInterface
{
    public function index(): View
    {
        return view('budget.create');
    }
    public function handlerCreate(CreateRequest $request): Request
    {
        DB::table('name_budgets')->insert([
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
}
