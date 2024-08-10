<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Budget extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'budgets';
    protected $fillable = [
        'name',
        'owner_id'
    ];

    public function data(){

        return $this->hasMany(BudgetRows::class, 'budget_id');
    }

}
