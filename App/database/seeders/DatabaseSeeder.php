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
            'compensation' => 150, 
            'model_wallets' => 1,
            'user_id' => rand(1,10),
            'names_wallets_id' => rand(1,100) ]);
              };
          
          DB::table('obligations_wallets')->insert($colectionObligationsWallets);

       
        //Добавление видов доступа 
        
       $colectionScopeDiscriptionsEtimates = [];
            for ($i = 0; $i <= 100; $i++) {
                array_push($colectionScopeDiscriptionsEtimates, 
                ["delete_table" => rand(0,1),
                "edit_permission" => rand(0,1),
                "edit_row" => rand(0,1),
                "browsing" => rand(0,1),
                "add_row" => rand(0,1),
                "delete_row" => rand(0,1),
                "names_wallets_id" => rand(1,100),
                "user_id" => rand(1,10),]
                );
            }

            
        DB::table('scope_discriptions')->insert($colectionScopeDiscriptionsEtimates);
     
    }
}
