<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wallet extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'wallets';
    protected $fillable = [
        'name',
        'owner_id'
    ];

    public function data(){

        return $this->hasMany(WalletRows::class, 'wallet_id');
    }
}
