<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetMembers extends Model
{
    use HasFactory;

    protected $fillable = [
        'budget_id',
        'user_id',
        'permissions',
    ];

}
