<?php

namespace Database\Seeders;

use App\Enums\InviteStatus;
use App\Enums\UserRole;
use App\Models\Wallet;
use App\Models\WalletMember;
use App\Models\WalletRow;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 30; $i++) {
            $owner = rand(1, 30);

            $wallet = Wallet::create([
                    'name' => $faker->words(3, true),
                    'owner_id' => $owner,
                    'created_at' => date(('Y-m-d H:i:s')),
                    'updated_at' => date(('Y-m-d H:i:s'))
                ]
            );
            $this->createMember($wallet->id, $owner, UserRole::OWNER, InviteStatus::ADDED_SYSTEM);
            for ($a = 0; $a < 3; $a++) {
                $this->createRow($wallet->id, $owner);
            }
        }

        for ($i = 0; $i < 300; $i++) {
            $userId = rand(1, 30);
            $walletId = rand(1, 30);
            if ($walletId === 1) {
                for ($a = 0; $a < 30; $a++) {
                    $this->createRow($walletId, $userId);
                }
            }
            $this->createRow($walletId, $userId);

            $exists = WalletMember::where('wallet_id', $walletId)
                ->where('user_id', $userId)
                ->exists();

            if (!$exists) {
                $this->createMember($walletId, $userId, UserRole::EDITOR, InviteStatus::INVITED);
            }
        }
    }

    private function createRow(int $walletId, int $userId): void
    {
        $faker = Faker::create();
        WalletRow::create([
                'name' => $faker->words(4, true),
                'amount' => rand(1, 15),
                'wallet_id' => $walletId,
                'user_id' => $userId,
                'created_at' => date(('Y-m-d H:i:s')),
                'updated_at' => date(('Y-m-d H:i:s'))
            ]
        );
    }

    private function createMember(int $walletId, int $userId, UserRole $type, InviteStatus $status): void
    {
        WalletMember::create([
                'wallet_id' => $walletId,
                'user_id' => $userId,
                'permissions' => $type,
                'status' => $status,
                'created_at' => date(('Y-m-d H:i:s')),
                'updated_at' => date(('Y-m-d H:i:s'))
            ]
        );
    }
}
