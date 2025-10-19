<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUser(): View
    {
        $user = Auth::user();

        return view('user', ['user' => $user]);
    }

    public function uploadAvatar(Request $request, int $id): RedirectResponse
    {
        $request->validate(['image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']);

        $user = User::findOrFail($id);
        if ($user->avatar !== null) {
            unlink(storage_path('/app/public/avatars/' . $user->avatar));
        }
        $image = $request->file('image')->store('public/avatars');
        $basename = basename($image);
        $user->avatar = $basename;
        $user->save();

        return back();
    }

    public function deleteAvatar(Request $request): RedirectResponse
    {
        $userId = $request->get('id');
        $user = User::findOrFail($userId);
        if ($user->avatar !== null) {
            unlink(storage_path('/app/public/avatars/' . $user->avatar));
            $user->avatar = null;
            $user->save();
        }

        return back();
    }
}
