<?php

namespace App\Services;

use App\Mail\UserInvited;
use Illuminate\Support\Facades\Mail;

class SendEmailServices
{
    public function sentInvite($user, $host, $type, $name, $id, $permissions): void
    {
        $acceptUrl = route( "{$type}.invite.accept", [$type => $id, 'user' => $user->id]);
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
}
