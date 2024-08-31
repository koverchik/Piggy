<?php

namespace Database\Seeders;

use App\Facades\ColorFacade;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        for($i =0 ; $i<30 ; $i++) {
            User::factory()->create([
                'name' => Str::random(10),
                'email' => Str::random(10).'@example.com',
                'color' => ColorFacade::getRandomColor()
            ]);
        }
        $this->call([WalletSeeder::class, BudgetSeeder::class]);
    }
}
