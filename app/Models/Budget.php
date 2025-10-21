<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Budget extends Model
{
    use softDeletes;

    protected $table = 'budgets';
    protected $fillable = [
        'name',
        'color',
        'owner_id',
        'created_at',
        'updated_at'
    ];

    public function data(): HasMany
    {
        return $this->hasMany(BudgetRow::class, 'budget_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(BudgetMember::class );
    }
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'budget_member', 'budget_id', 'user_id')
            ->withTimestamps();
    }
}
