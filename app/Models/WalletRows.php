<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class WalletRows extends Model
{
    use HasFactory;

    protected $table = 'wallet_rows';

    protected $fillable = [
        'name',
        'amount',
        'wallet_id',
        'user_id'
    ];

    public function user(){

        return $this->belongsTo(User::class);
    }
}
