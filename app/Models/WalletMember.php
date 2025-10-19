<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WalletMember extends Model
{
    protected $table = 'wallet_member';
    protected $fillable = [
        'wallet_id',
        'user_id',
        'permissions',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function budget(): BelongsTo
    {
        return $this->belongsTo(Wallet::class, 'wallet_id');
    }
}
