<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetRow extends Model
{
    protected $table = 'budget_row';

    protected $fillable = [
        'name',
        'amount',
        'budget_id',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public static function totalAmountForUser(int $userId, int $budgetId): float
    {
        return (float) self::where('user_id', $userId)
            ->where('budget_id', $budgetId)
            ->sum('amount');
    }
}
