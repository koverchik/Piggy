<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
   
         \App\Models\User::factory(10)->create();
        //Создание названия колекции кошельков
        $colectionNamesWallets = [];
        for ($i = 0; $i <= 100; $i++) {
            array_push($colectionNamesWallets, [ 'name' => str_random(30), 'user_id' => rand(1,10) ]);
        }
        
        DB::table('names_wallets')->insert($colectionNamesWallets);
         //Создание строк для колекции кошельков
        $colectionRoWallets = [];

        for ($i = 0; $i <= 1000; $i++) {
            $current = Carbon::now();
            $date = Carbon::now()->addDays(-$i);
            array_push($colectionRoWallets, [ 'name' => str_random(40),'amount' => rand(50,10000)/100, 'created_at_time'=> $date, 'names_wallets_id' => rand(1,100), 'user_id' => rand(1,10)  ]);
        }
        DB::table('row_wallets')->insert($colectionRoWallets);

          //Создание названия колекции смет
          $colectionNamesEstimates = [];
          for ($i = 0; $i <= 100; $i++) {
              array_push($colectionNamesEstimates, [ 'name' => str_random(30), 'user_id' => rand(1,10) ]);
          }
          
          DB::table('names_estimates')->insert($colectionNamesEstimates);
        
        //Создание строк для колекции смет
        $colectionRowEstimates = [];

        for ($i = 0; $i <= 1000; $i++) {
    
            array_push($colectionRowEstimates, [ 'name' => str_random(40),'amount' => rand(50,10000)/100, 'user_id' => rand(1,10), 'names_estimates_id' => rand(1,100) ]);
        }
        DB::table('row_estimates')->insert($colectionRowEstimates);
        
        //Добавление пользователя к таблице 
        $colectionScopeEtimates = [];

        for ($i = 1; $i <= 101; $i++) {
            array_push($colectionScopeEtimates, ['user_id' => rand(1,10), 'names_estimates_id' => $i ]);
        }
        DB::table('scope_estimates')->insert($colectionScopeEtimates);
    

          $colectionObligationsWallets = [];
          for ($i = 1; $i <= 100; $i++) {
              
          array_push($colectionObligationsWallets, [ 
                'compensation' => 50, 
                'model_wallets' => 0,
                'user_id' => rand(1,10),
                'names_wallets_id' => $i ]);
    
          array_push($colectionObligationsWallets, [ 
            'compensation' => 50, 
            'model_wallets' => 0,
            'user_id' => rand(1,10),
            'names_wallets_id' => rand(1,100) ]);
              };
          
          DB::table('obligations_wallets')->insert($colectionObligationsWallets);

        // compensation     | double(8,2)     | NO   |     | NULL    |                |
        // | model_wallets    | tinyint(1)      | NO   |     | 0       |                |
        // | user_id          | bigint unsigned | NO   | MUL | NULL    |                |
        // | names_wallets_id 
        //Добавление видов доступа 
         $colectionScopeDiscriptionsEtimates = [
             [ "name" => "Создатель",
                "delete_table" => 1,
                "edit_permission" => 1,
                "edit_row" => 1,
                "browsing" => 1,
                "add_row" => 1,
                "delete_row" => 1,
                ],  
              [ "name" => "Владелец",
                "delete_table" => 0,
                "edit_permission" => 1,
                "edit_row" => 1,
                "browsing" => 1,
                "add_row" => 1,
                "delete_row" => 1,
                ], 
            [ "name" => "Редактор",
                "delete_table" => 0,
                "edit_permission" => 0,
                "edit_row" => 1,
                "browsing" => 1,
                "add_row" => 1,
                "delete_row" => 1,
                ],
            [ "name" => "Просмотр",
                "delete_table" => 0,
                "edit_permission" => 0,
                "edit_row" => 0,
                "browsing" => 1,
                "add_row" => 0,
                "delete_row" => 0,
                ]
            ];    

        DB::table('scope_discriptions')->insert($colectionScopeDiscriptionsEtimates);
     
    }
}
