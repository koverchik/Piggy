<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\MenageInvitationServices;
use App\Services\SendEmailServices;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

interface InviteMemberControllerInterface
{
    public function invite(Request $request, string $id, SendEmailServices $sendEmailServices): RedirectResponse;
    public function resendInvite(string $id, User $user, SendEmailServices $sendEmailServices): RedirectResponse;
    public function acceptInvite(string $id, User $user, MenageInvitationServices $menageInvitationServices): RedirectResponse;
    public function declineInvite(string $id, User $user, MenageInvitationServices $menageInvitationServices): RedirectResponse;
}
