<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Budget extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'name_budgets';
    protected $fillable = [
        'name',
        'user_id'
    ];
}
