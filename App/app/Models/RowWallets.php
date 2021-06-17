<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RowWallets extends Model
{
  public function NamesWallet()
  {
    return $this->belongsTo(NamesWallet::class, "names_wallets_id", "id");
  }

  public function Autor()
  {
    return $this->hasOne(User::class);
  }
    use HasFactory;

}

