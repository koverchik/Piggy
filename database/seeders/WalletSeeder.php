<?php

namespace Database\Seeders;

use App\Models\WalletMembers;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use stdClass;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i =0 ; $i<30 ; $i++) {
            $owner = rand(1, 30);
            $item = DB::table('wallets')->insert([
                'name'=> Str::random(10),
                'owner_id'=> $owner,
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
            DB::table('wallet_members')->insert([
                'wallet_id' => $i+1,
                'user_id'=> $owner,
                'permissions'=> json_encode("OWNER"),
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
        }
        for($i =0 ; $i<300 ; $i++) {
            $userId = rand(1, 30);
            $walletId = rand(1, 30);
            DB::table('wallet_rows')->insert([
                'name'=> Str::random(10),
                'amount' => rand(1, 15),
                'wallet_id' => $walletId,
                'user_id'=> $userId,
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
            $exists = DB::table('wallet_members')
                ->where('wallet_id', $walletId)
                ->where('user_id', $userId)
                ->exists();
            if(!$exists){
                DB::table('wallet_members')->insert([
                    'wallet_id' => $walletId,
                    'user_id'=> $userId,
                    'permissions'=> json_encode("EDITOR"),
                    'created_at'=> date(('Y-m-d H:i:s')),
                    'updated_at'=> date(('Y-m-d H:i:s'))
                ]);
            }
        }
    }
}
