<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObligationsWallets extends Model
{
  
  public function Author()
  {
    return $this->hasOne(User::class, "id", "user_id");
  }
    use HasFactory;
}
