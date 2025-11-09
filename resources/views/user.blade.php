@extends('layouts.master')
@section('content')
    <main class="container py-4 flex-shrink-0">
        @if($errors->any())
            @foreach($errors->all() as $error)
                <div class="alert alert-danger m-2"> {{$error}}</div>
            @endforeach
        @endif
        <div>
            <div class="d-flex flex-row justify-content-between align-items-md-stretch">
                <div class="p-4">
                    <div class="m-6">
                        <div class="d-flex justify-content-center align-items-center position-relative"
                        @include('members.user-picture', ['user' => $user, 'width' => 200, 'height' => 200])
                    </div>
                    @if($user->avatar !== null)
                        <form action="{{route('delete.avatar')}}" method="POST" id="form-delete-avatar">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="id" class="form-control" id="input-{{$user->id}}"
                                   value="{{$user->id}}">
                        </form>
                        <div class="modal fade " id="deleteUserAvatar" data-bs-backdrop="static"
                             data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteUserAvatarLabel"
                             aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="deleteUserAvatarLabel">Delete avatar</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure you want to delete your avatar?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="submit" form="form-delete-avatar" class="btn btn-primary">
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
                <form action="{{route('uploadAvatar', ['id' => $user->id])}}" id="avatarImageUploadForm" method="POST"
                      enctype="multipart/form-data" class="mt-4">
                    @csrf
                    <div class="d-flex justify-content-center">
                        <label class="btn btn-light w-100" for="avatarImageUpload">Update</label>
                        <input type="file" name="image" id="avatarImageUpload" style="display: none;">
                    </div>
                </form>
            </div>
            <div class="flex-fill p-4">
                <h2>{{$user->name}}</h2>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span>Email:</span>
                    <span>{{$user->email}}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span>Member since:</span>
                    <span>{{date('d.m.Y', strtotime($user->created_at))}}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span>Color:</span>
                    <svg class="ps-1" width="27px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" fill="{{$user->color}}"/>
                    </svg>
                </div>
            </div>
        </div>
        <div>
            @if($wallets->count() > 0)
                <h2 class="text-center m-3">Active wallets</h2>
                @include('tables.user-table',  ['data' => $wallets, 'routeName' => 'wallet.show'])
            @endif
            @if($deletedWallets->count() > 0)
                <h2 class="text-center m-3">Deleted wallets</h2>
                @include('tables.user-table',  ['data' => $deletedWallets])
            @endif
            @if($budgets->count() > 0)
                <h2 class="text-center m-3">Active budgets</h2>
                @include('tables.user-table',  ['data' => $budgets, 'routeName' => 'budget.show'])
            @endif
            @if($deletedBudgets->count() > 0)
                <h2 class="text-center m-3">Deleted budgets</h2>
                @include('tables.user-table',  ['data' => $deletedBudgets])
            @endif
            <div style="height: 72px"></div>
        </div>
    </main>
@endsection
