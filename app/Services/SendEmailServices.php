<?php

namespace App\Services;

use App\Mail\ChangePermission;
use App\Mail\UserInvited;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class SendEmailServices
{
    public function sentInvite(User $user, User $host, string $type, string $name, $id, string $permissions): void
    {
        $acceptUrl = route("{$type}.invite.accept", [$type => $id, 'user' => $user->id]);
        $declineUrl = route("{$type}.invite.decline", [$type => $id, 'user' => $user->id]);
        Mail::to($user->email)
            ->queue(new UserInvited(
                $user,
                $host,
                $type,
                $name,
                $permissions,
                $acceptUrl,
                $declineUrl));
    }

    public function sentChangePermission(User $user, User $host, int $id, string $name, string $level, string $type): void
    {
        $link = route("members.{$type}.table", [$type => $id]);
        Mail::to($user->email)
            ->queue(new ChangePermission(
                $user,
                $host,
                $name,
                $level,
                $link));
    }
}
