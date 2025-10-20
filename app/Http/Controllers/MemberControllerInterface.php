<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;

interface MemberControllerInterface
{
    public function show(string $id): View;
    public function deleteUser(string $id, User $user): RedirectResponse;
}
