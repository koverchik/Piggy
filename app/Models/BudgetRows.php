<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetRows extends Model
{
    use HasFactory;

    protected $table = 'budget_rows';

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
}
