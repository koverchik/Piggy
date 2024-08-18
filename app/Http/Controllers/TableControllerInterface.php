<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

interface TableControllerInterface
{
    public function index(): View;
    public function create(): View;
    public function store(Request $request): RedirectResponse;
    public function show(string $id): View;
    public function edit(string $id): View;
    public function update(Request $request, string $id): RedirectResponse;
    public function destroy(string $id): RedirectResponse;
    public function trashList(): View;
    public function handlerMoveToTrash(string $id): RedirectResponse;
    public function handlerRestore(string $id): RedirectResponse;
}
