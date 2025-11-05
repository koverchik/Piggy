<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'color',
        'avatar',
        'subscription'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function walletMemberships()
    {
        return $this->belongsToMany(Wallet::class, 'wallet_member', 'user_id', 'wallet_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps();
    }

    public function walletMembershipsTrashed()
    {
        return $this->belongsToMany(Wallet::class, 'wallet_member', 'user_id', 'wallet_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps()
            ->onlyTrashed();
    }

    public function walletsOwned()
    {
        return $this->belongsToMany(Wallet::class, 'wallet_member', 'user_id', 'wallet_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps()
            ->wherePivot('permissions', 'owner');
    }

    public function walletsOwnedTrashed()
    {
        return $this->belongsToMany(Wallet::class, 'wallet_member', 'user_id', 'wallet_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps()
            ->onlyTrashed()
            ->wherePivot('permissions', 'owner');
    }

    public function crossWalletWith(int $secondId)
    {
        return Wallet::query()
            ->select('wallets.*')
            ->join('wallet_member as wm1', 'wallets.id', '=', 'wm1.wallet_id')
            ->join('wallet_member as wm2', 'wallets.id', '=', 'wm2.wallet_id')
            ->where('wm1.user_id', $this->id)
            ->where('wm2.user_id', $secondId)
            ->distinct();
    }

    public function crossWalletTrashedWith(int $secondId)
    {
        return Wallet::onlyTrashed()
            ->select('wallets.*')
            ->join('wallet_member as wm1', 'wallets.id', '=', 'wm1.wallet_id')
            ->join('wallet_member as wm2', 'wallets.id', '=', 'wm2.wallet_id')
            ->where('wm1.user_id', $this->id)
            ->where('wm2.user_id', $secondId)
            ->distinct();
    }

    public function budgetMemberships()
    {
        return $this->belongsToMany(Budget::class, 'budget_member', 'user_id', 'budget_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps();
    }

    public function budgetMembershipsTrashed()
    {
        return $this->belongsToMany(Budget::class, 'budget_member', 'user_id', 'budget_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps()
            ->onlyTrashed();
    }

    public function crossBudgetsWith(int $secondId)
    {
        return Budget::query()
            ->select('budgets.*')
            ->join('budget_member as bm1', 'budgets.id', '=', 'bm1.budget_id')
            ->join('budget_member as bm2', 'budgets.id', '=', 'bm2.budget_id')
            ->where('bm1.user_id', $this->id)
            ->where('bm2.user_id', $secondId)
            ->distinct();
    }

    public function crossBudgetsTrashedWith(int $secondId)
    {
        return Budget::onlyTrashed()
            ->select('budgets.*')
            ->join('budget_member as bm1', 'budgets.id', '=', 'bm1.budget_id')
            ->join('budget_member as bm2', 'budgets.id', '=', 'bm2.budget_id')
            ->where('bm1.user_id', $this->id)
            ->where('bm2.user_id', $secondId)
            ->distinct();
    }

    public function budgetsOwned()
    {
        return $this->belongsToMany(Budget::class, 'budget_member', 'user_id', 'budget_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps()
            ->wherePivot('permissions', 'owner');
    }

    public function budgetsOwnedTrashed()
    {
        return $this->belongsToMany(Budget::class, 'budget_member', 'user_id', 'budget_id')
            ->withPivot('permissions', 'status')
            ->withTimestamps()
            ->onlyTrashed()
            ->wherePivot('permissions', 'owner');
    }
}
