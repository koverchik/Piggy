<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

interface MemberControllerInterface
{
    public function show(string $id): View;
    public function deleteUser(string $id, User $user): RedirectResponse;
    public function addUser(Request $request, string $id): RedirectResponse;
    public function changePermissionUser(Request $request, string $id, User $user): RedirectResponse;

}
