<?php

namespace App\Models;

use App\Enums\InviteStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class BudgetMember extends Model
{
    protected $table = 'budget_member';

    protected $fillable = [
        'budget_id',
        'user_id',
        'permissions',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function budget(): BelongsTo
    {
        return $this->belongsTo(Budget::class, 'budget_id');
    }

    public static function totalsAmountForUsers(int $budgetId)
    {
        $allowedStatuses = [
            InviteStatus::ADDED_SYSTEM->value,
            InviteStatus::APPROVED->value,
        ];

        return self::select('budget_member.user_id', DB::raw('SUM(budget_row.amount) as total_amount'))
            ->join('budget_row', function ($join) {
                $join->on('budget_member.budget_id', '=', 'budget_row.budget_id')
                    ->on('budget_member.user_id', '=', 'budget_row.user_id');
            })
            ->where('budget_member.budget_id', $budgetId)
            ->whereIn('budget_member.status', $allowedStatuses)
            ->groupBy('budget_member.user_id')
            ->with('user')
            ->get();
    }
}
