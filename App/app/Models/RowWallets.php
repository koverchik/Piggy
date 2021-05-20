<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RowWallets extends Model
{
    use HasFactory;

    public function NamesWallet()
    {
      return $this->belongsTo(NamesWallet::class);
    }
}
