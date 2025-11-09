<?php

namespace App\Traits;

use App\Models\BudgetMember;
use App\Models\BudgetRow;
use App\Models\WalletMember;
use App\Models\WalletRow;

trait CalculateDebitCreditTrait
{
    protected array $modelsMember = [
        'budget' => BudgetMember::class,
        'wallet' => WalletMember::class,
    ];

    protected array $modelsRow = [
        'budget' => BudgetRow::class,
        'wallet' => WalletRow::class,
    ];

    private function calculate(int $entityId, int $userId, string $type): array
    {
        $debitCredit = [];
        $usersData = $this->modelsMember[$type]::totalsAmountForUsers($entityId);
        $countMember = count($usersData);
        $userDebt = $this->modelsRow[$type]::totalAmountForUser($userId, $entityId) / $countMember;

        foreach ($usersData as $data) {
            if ($userId !== $data->user_id) {
                $memberDebit = ((float)$data->total_amount) / $countMember;
                if ($memberDebit > $userDebt) {
                    $debitCredit[] = [
                        'user' => $data->user,
                        'debit' => round($memberDebit - $userDebt, 2),
                        'credit' => 0,
                        'total_amount' => (float)$data->total_amount
                    ];
                } else {
                    $debitCredit[] = [
                        'user' => $data->user,
                        'debit' => 0,
                        'credit' => round($userDebt - $memberDebit, 2),
                        'total_amount' => (float)$data->total_amount
                    ];
                }
            } else {
                $debitCredit[] = [
                    'user' => $data->user,
                    'debit' => 0,
                    'credit' => 0,
                    'total_amount' => round((float)$data->total_amount, 2)
                ];
            }
        }

        return $debitCredit;
    }
}
