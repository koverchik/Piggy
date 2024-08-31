<?php

namespace App\Enums;
enum UserRole: string
{
    case OWNER  = 'owner';
    case EDITOR = 'editor';
    case VIEWER  = 'viewer';
}
