<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRequest;
use Illuminate\Contracts\View\View;
use \Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

interface TableControllerInterface
{
    public function index(): View;
    public function handlerCreate(CreateRequest $request): Request;
    public function handlerMoveToTrash(Request $request): RedirectResponse;
    public function handlerRestore(Request $request): RedirectResponse;
    public function handlerDelete(Request $request): RedirectResponse;
    public function list(): View;
    public function trashList(): View;
    public function tableView(Request $request, string $id): View;
    public function editTable(Request $request, string $id): View;
    public function addRow(Request $request, string $id): RedirectResponse;
}
