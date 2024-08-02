<?php

namespace App\Http\Controllers;

use App\Http\Requests\BudgetRequest;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function index()
    {

        return view('budget.create');
    }
    public function handBudgetCreate(BudgetRequest $request): Request
    {
        return $request;
    }
}
