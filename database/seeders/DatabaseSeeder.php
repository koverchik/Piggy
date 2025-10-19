<?php

namespace Database\Seeders;

use App\Facades\ColorFacade;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        for($i =0 ; $i<30 ; $i++) {
            User::factory()->create([
                'name' => $faker->name,
                'email' => $faker->freeEmail,
                'color' => ColorFacade::getRandomColor()
            ]);
        }
        $this->call([WalletSeeder::class, BudgetSeeder::class]);
    }
}
