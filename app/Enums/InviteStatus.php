<?php

namespace App\Enums;
enum InviteStatus: string
{
    case INVITED  = 'invited';
    case APPROVED = 'approved';
    case DECLINED = 'declined';
    case ADDED_SYSTEM = 'added by system';
}
