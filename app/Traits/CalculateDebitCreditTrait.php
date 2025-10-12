<?php

namespace App\Traits;

trait CalculateDebitCreditTrait
{
    private function calculate($userData, int $userId): array
    {
        $debitCredit = [];

        $member = $userData->firstWhere('user_id', $userId);
        $countMember = count($userData);

        if($member->total_amount === null){
            $userDebt = 0;
        }else{
            $userDebt = $member->total_amount / $countMember;
        }

        foreach ($userData as $data) {
            if ($userId !== $data->user_id) {
                $memberDebit =  ((float) $data->total_amount) / $countMember;
                if ($memberDebit > $userDebt) {
                    $debitCredit[] = [
                        'user' => $data->user,
                        'debit' => round($memberDebit - $userDebt, 2),
                        'credit' => 0
                    ];
                } else {
                    $debitCredit[] = [
                        'user' => $data->user,
                        'debit' => 0,
                        'credit' => round($userDebt - $memberDebit, 2)
                    ];
                }
            }
        }
        return $debitCredit;
    }
}
