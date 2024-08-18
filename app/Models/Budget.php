<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Budget extends Model
{
    use HasFactory, softDeletes;

    protected $table = 'budgets';
    protected $fillable = [
        'name',
        'color',
        'owner_id'
    ];

    public function data(): HasMany
    {

        return $this->hasMany(BudgetRows::class, 'budget_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'budget_members', 'budget_id', 'user_id')
            ->withTimestamps();
    }
}
