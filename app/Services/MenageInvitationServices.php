<?php

namespace App\Services;

use App\Models\BudgetMember;
use App\Models\WalletMember;

class MenageInvitationServices
{
    protected array $models = [
        'budget' => BudgetMember::class,
        'wallet' => WalletMember::class,
    ];
    public function changeStatus($id, $user, string $type, $status): string
    {
        $modelClass = $this->models[$type];
        $member = $modelClass::where("{$type}_id", $id)
            ->where('user_id', $user->id)
            ->first();
        if ($member->status !== $status) {
            $member->update(['status' => $status]);
            $message = sprintf('Invitation %s.', $status);

        } else {
            $message = sprintf('You have already %s the invitation. .', $status);
        }

        return $message;
    }
}
