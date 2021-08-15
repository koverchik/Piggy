<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RowEstimates extends Model
{
  public function NamesEstimates()
  {
    return $this->belongsTo(NamesEstimates::class);
  }
    use HasFactory;
    
}
