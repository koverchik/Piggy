<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

interface MemberControllerInterface
{
    public function show(string $id): View;
    public function invite(Request $request, string $id): RedirectResponse;
    public function acceptInvite(string $id, User $user): RedirectResponse;
    public function deleteUser(string $id, User $user): RedirectResponse;
    public function changePermissionUser(Request $request, string $id, User $user): RedirectResponse;
}
