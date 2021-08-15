<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NamesEstimates extends Model
{
  public function ScopeEstimates()
  {
    return $this->hasMany(ScopeEstimates::class);
  }
  public function RowEstimates()
  {
    return $this->hasMany(RowEstimates::class);
  }
    use HasFactory;

}