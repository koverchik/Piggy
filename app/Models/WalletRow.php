<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WalletRow extends Model
{
    protected $table = 'wallet_row';

    protected $fillable = [
        'name',
        'amount',
        'wallet_id',
        'user_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function totalAmountForUser(int $userId, int $walletId): float
    {
        return (float) self::where('user_id', $userId)
            ->where('wallet_id', $walletId)
            ->sum('amount');
    }
}
