<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletMembers extends Model
{
    use HasFactory;

    protected $fillable = [
        'wallets_id',
        'user_id',
        'permissions',
    ];
}
