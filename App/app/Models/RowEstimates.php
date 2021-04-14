<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RowEstimates extends Model
{
    use HasFactory;
    
    public function NamesEstimates()
    {
      return $this->belongsTo(NamesEstimates::class);
    }
}
