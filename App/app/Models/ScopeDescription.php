<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScopeDescription extends Model
{
    use HasFactory;
    
    public function NamesWallet()
    {
     return $this->belongsTo(NamesWallet::class, 'names_wallets_id', 'id');
    }

    public function User()
    {
     return $this->hasOne(User::class, 'id', 'user_id');
    }

}
