<?php

namespace Database\Seeders;

use App\Models\BudgetMembers;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i =0 ; $i<30 ; $i++) {
            $owner = rand(1, 30);
           DB::table('budgets')->insert([
                'name'=> Str::random(10),
                'owner_id'=> rand(1, 30),
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
            DB::table('budget_members')->insert([
                'budget_id' => $i+1,
                'user_id'=> $owner,
                'permissions'=> json_encode("OWNER"),
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
        }
        for($i =0 ; $i<300 ; $i++) {
            $userId = rand(1, 30);
            $budgetId = rand(1, 30);
            DB::table('budget_rows')->insert([
                'name'=> Str::random(10),
                'amount' => rand(1, 15),
                'budget_id' => $budgetId,
                'user_id'=> $userId,
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
            $exists = DB::table('budget_members')
                ->where('budget_id', $budgetId)
                ->where('user_id', $userId)
                ->exists();
            if(!$exists){
                    DB::table('budget_members')->insert([
                        'budget_id' => $budgetId,
                        'user_id'=> $userId,
                        'permissions'=> json_encode("EDITOR"),
                        'created_at'=> date(('Y-m-d H:i:s')),
                        'updated_at'=> date(('Y-m-d H:i:s'))
                    ]);
            }
        }
    }
}
