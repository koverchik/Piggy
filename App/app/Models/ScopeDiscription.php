<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScopeDiscription extends Model
{
    public function NamesWallet()
    {
     return $this->belongsTo(NamesWallet::class, 'id');
    }
    use HasFactory;

}
