<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        for($i =0 ; $i<30 ; $i++) {
            User::factory()->create([
                'name' => Str::random(10),
                'email' => Str::random(10).'@example.com',
            ]);
        }
        $this->call([WalletSeeder::class, BudgetSeeder::class]);
    }
}
