<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScopeEstimates extends Model
{
    use HasFactory;
    
    public function NamesEstimates()
    {
      return $this->belongsTo(NamesEstimates::class);
    }
}
