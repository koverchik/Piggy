<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NamesWallet extends Model
{
  public function ScopeDiscription()
  {
    return $this->hasMany(ScopeDiscription::class);
  }

  public function RowWallets()
  {
    return $this->hasMany(RowWallets::class, 'foreign_key');
  }
    use HasFactory;

}
