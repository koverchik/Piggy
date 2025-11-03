<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Enums\InviteStatus;
use App\Enums\UserRole;
use App\Facades\ColorFacade;
use App\Models\Budget;
use App\Models\BudgetMember;
use App\Models\BudgetRow;
use App\Models\User;
use App\Services\MenageInvitationServices;
use App\Services\SendEmailServices;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BudgetMemberController extends Controller implements MemberControllerInterface, InviteMemberControllerInterface
{
    public function show(string $id): View
    {
        $user = Auth::user();
        $budget = Budget::with('members')->findOrFail($id);

        return view('members.members-table', [
            'type' => FinancesType::BUDGET->value,
            'items' => $budget->members,
            'name' => $budget->name,
            'id' => $id,
            'user' => $user,
        ]);
    }

    public function deleteUser(string $id, User $user): RedirectResponse
    {
        $budget = Budget::find($id);

        if ($budget) {
            BudgetRow::where('budget_id', $id)->where('user_id', $user->id)->delete();
            $budget->members()->detach($user->id);
        }

        return back();
    }

    public function changePermissionUser(Request $request, string $id, User $user): RedirectResponse
    {
        Validator::make($request->all(), [
            'permissions' => 'required|string',
        ])->validate();

        $role = UserRole::tryFrom($request->permissions);
        $member = BudgetMember::where('budget_id', $id)
            ->where('user_id', $user->id)
            ->first();

        if ($member->permissions === $role->value) {
            $text = 'Access for the user %s has not been changed and she remains an %s.';
        } else {
            $member->update(['permissions' => $role]);
            $text = 'Access for the user %s has been changed to %s.';
        }

        return back()->with('success', sprintf($text, $user->name, $role->value));
    }

    public function acceptInvite(string $id, User $user, MenageInvitationServices $menageInvitationServices): RedirectResponse
    {
        $authUser = Auth::user();
        if (!$authUser) {
            redirect(route('login'));
        }

        if ($authUser->id === $user->id) {
            $message = $menageInvitationServices->changeStatus($id, $user, FinancesType::BUDGET->value, InviteStatus::APPROVED->value);
            return redirect(route('members.budget.table', ['budget' => $id]))->with('success', $message);
        } else {
            return redirect(route('main'));
        }
    }

    public function declineInvite(string $id, User $user, MenageInvitationServices $menageInvitationServices): RedirectResponse
    {
        $authUser = Auth::user();
        if (!$authUser) {
            redirect(route('login'));
        }

        if ($authUser->id === $user->id) {
            $message = $menageInvitationServices->changeStatus($id, $user, FinancesType::BUDGET->value, InviteStatus::DECLINED->value);
            return redirect(route('main'))->with('success', $message);
        } else {
            return redirect(route('main'));
        }
    }

    public function invite(Request $request, string $id, SendEmailServices $sendEmailServices): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'permissions' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->route('members.budget.table', ['budget' => $id])
                ->withErrors($validator, 'invite')
                ->withInput()
                ->with('error', 'Please correct the errors and try again.');
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'color' => ColorFacade::getRandomColor(),
                'password' => 'salt'
            ]);
        }

        BudgetMember::firstOrCreate([
            'budget_id' => $id,
            'user_id' => $user->id,
            'status' => InviteStatus::INVITED->value,
            'permissions' => $request->permissions
        ]);
        $host = Auth::user();
        $budget = Budget::find($id);
        $sendEmailServices->sentInvite($user, $host, FinancesType::BUDGET->value, $budget->name, $id, $request->permissions);

        return back()->with('success', 'Invitation sent successfully!');
    }

    public function resendInvite(string $id, User $user, SendEmailServices $sendEmailServices): RedirectResponse
    {
        $host = Auth::user();
        $budget = Budget::find($id);
        $member = BudgetMember::firstWhere([
            'user_id' => $user->id,
            'budget_id' => $id,
        ]);

        $sendEmailServices->sentInvite($user, $host, FinancesType::BUDGET->value, $budget->name, $id, $member->permissions);
        $member->touch();

        return back()->with('success', 'Invitation resent successfully!');
    }

}
