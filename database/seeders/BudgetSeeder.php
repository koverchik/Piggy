<?php

namespace Database\Seeders;

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
            DB::table('name_budgets')->insert([
                'name'=> Str::random(10),
                'user_id'=> rand(1, 30),
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
        }
        for($i =0 ; $i<300 ; $i++) {
            DB::table('data_budgets')->insert([
                'name'=> Str::random(10),
                'amount' => rand(1, 15),
                'name_budgets_id' => rand(1, 30),
                'user_id'=> rand(1, 30),
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]);
        }
    }
}
