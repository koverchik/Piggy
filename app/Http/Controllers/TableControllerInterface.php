<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;

interface TableControllerInterface
{
    public function trashList(): View;
    public function handlerMoveToTrash(string $id): RedirectResponse;
    public function handlerRestore(string $id): RedirectResponse;
}
