<?php

namespace Database\Seeders;

use App\Enums\InviteStatus;
use App\Enums\UserRole;
use App\Models\Budget;
use App\Models\BudgetMember;
use App\Models\BudgetRow;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class BudgetSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        for($i =0 ; $i<30 ; $i++) {
            $owner = rand(1, 30);

            $budget = Budget::create([
                'name' => $faker->words(3, true),
                'owner_id' => $owner,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')]);

            $this->createMember($budget->id, $owner, UserRole::OWNER, InviteStatus::ADDED_SYSTEM);

            for($a = 0; $a < 3; $a++) {
                $this->createRow($budget->id, $owner);
            }
        }

        for($i =0 ; $i<30 ; $i++) {
            $userId = rand(1, 30);
            $budgetId = rand(1, 30);
            $this->createRow($budgetId, $userId);
            $exists = DB::table('budget_member')
                ->where('budget_id', $budgetId)
                ->where('user_id', $userId)
                ->exists();

            if(!$exists){
                $this->createMember($budgetId, $userId, UserRole::EDITOR, InviteStatus::INVITED);
            }
        }
    }

    private function createRow(int $budgetId, int $userId): void
    {
        $faker = Faker::create();
        BudgetRow::create([
                'name'=> $faker->words(5, true),
                'amount' => rand(1, 15),
                'budget_id' => $budgetId,
                'user_id'=> $userId,
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]
        );
    }

    private function createMember(int $budgetId, int $userId, UserRole $type, InviteStatus $status): void
    {
        BudgetMember::create([
                'budget_id' => $budgetId,
                'user_id'=> $userId,
                'status' => $status,
                'permissions'=> json_encode($type),
                'created_at'=> date(('Y-m-d H:i:s')),
                'updated_at'=> date(('Y-m-d H:i:s'))
            ]
        );
    }
}

