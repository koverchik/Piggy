<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wallet extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'wallets';
    protected $fillable = [
        'name',
        'owner_id'
    ];

    public function data(): HasMany
    {
        return $this->hasMany(WalletRows::class, 'wallet_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(BudgetMembers::class );
    }
    public function members()
    {
        return $this->belongsToMany(User::class, 'wallet_members', 'wallet_id', 'user_id')
            ->withTimestamps();
    }
}
