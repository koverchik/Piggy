<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wallet extends Model
{
    use SoftDeletes;

    protected $table = 'wallets';
    protected $fillable = [
        'name',
        'owner_id',
        'created_at',
        'updated_at'
    ];

    public function data(): HasMany
    {
        return $this->hasMany(WalletRow::class, 'wallet_id');
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(WalletMember::class );
    }
    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'wallet_member', 'wallet_id', 'user_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps();
    }
}
