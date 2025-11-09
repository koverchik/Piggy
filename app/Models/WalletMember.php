<?php

namespace App\Models;

use App\Enums\InviteStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class WalletMember extends Model
{
    protected $table = 'wallet_member';
    protected $fillable = [
        'wallet_id',
        'user_id',
        'permissions',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function wallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class, 'wallet_id');
    }

    public static function totalsAmountForUsers(int $walletId)
    {
        $allowedStatuses = [
            InviteStatus::ADDED_SYSTEM->value,
            InviteStatus::APPROVED->value,
        ];

        return self::select('wallet_member.user_id', DB::raw('SUM(wallet_row.amount) as total_amount'))
            ->join('wallet_row', function ($join) {
                $join->on('wallet_member.wallet_id', '=', 'wallet_row.wallet_id')
                    ->on('wallet_member.user_id', '=', 'wallet_row.user_id');
            })
            ->where('wallet_member.wallet_id', $walletId)
            ->whereIn('wallet_member.status', $allowedStatuses)
            ->groupBy('wallet_member.user_id')
            ->with('user')
            ->get();
    }
}
