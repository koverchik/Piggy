<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class WalletMembers extends Model
{
    use HasFactory;

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
