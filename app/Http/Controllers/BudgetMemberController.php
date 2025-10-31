<?php

namespace App\Http\Controllers;

use App\Enums\FinancesType;
use App\Enums\InviteStatus;
use App\Enums\UserRole;
use App\Facades\ColorFacade;
use App\Mail\UserInvited;
use App\Models\Budget;
use App\Models\BudgetMember;
use App\Models\BudgetRow;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class BudgetMemberController extends Controller implements MemberControllerInterface
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
            BudgetRow::where('budget_id', $id)
                ->where('user_id', $user->id)
                ->delete();
            $budget->members()->detach($user->id);
        }

        return back();
    }

    public function changePermissionUser(Request $request, string $id, User $user): RedirectResponse
    {
        $request->validate([
            'permissions' => 'required|string',
        ]);
        $role = UserRole::tryFrom($request->permissions);
        BudgetMember::where('budget_id', $id)
            ->where('user_id', $user->id)
            ->update(['permissions' => $role]);

        return back();
    }

    public function inviteAccept(string $id, User $user): RedirectResponse
    {
        $authUser = Auth::user();
        if (!$authUser) {
            redirect(route('login'));
        }
        $budget = Budget::find($id);
        $userIds = $budget->members()->pluck('users.id')->toArray();
        if (in_array($user->id, $userIds)) {
            return redirect(route('members.budget.table', ['budget' => $id]));
        } else {
            return redirect(route('main'));
        }
    }

    public function addUser(Request $request, string $id): RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'permissions' => 'required',
            'name' => 'required',
        ])->validateWithBag('invite');

        if ($validator->fails()) {
            return redirect(route('members.budget.table', ['budget' => $id]))->withErrors($validator, 'invite')->withInput();
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
        $acceptUrl = route('budget.invite.accept', ['budget' => $id, 'user' => $user->id]);

        Mail::to($user->email)
            ->queue(new UserInvited(
                $user,
                $host,
                FinancesType::BUDGET->value,
                $budget->name,
                $request->permissions,
                $acceptUrl));

        return redirect(route('members.budget.table', ['budget' => $id]));
    }
}
