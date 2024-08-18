@extends('layouts.master')
@section('content')
    <main class="container py-4 flex-shrink-0">
        @if($errors->any())
            @foreach($errors->all() as $error)
                <div class="alert alert-danger m-2"> {{$error}}</div>
            @endforeach
        @endif
        <div class="d-flex flex-row justify-content-between align-items-md-stretch">
            <div class="p-4">
                <div class="m-6">
                    @if($user->avatar !== null)
                        <div class="d-flex justify-content-center align-items-center position-relative" style="width: 200px; height: 200px; overflow: hidden;">
                            <img src="{{ asset('storage/avatars/'.$user->avatar) }}" class="m-1 w-100" alt="avatar"/>
                            <button type="button" class="btn-close position-absolute top-0 end-0 m-1" data-bs-toggle="modal" data-bs-target="#deleteUserAvatar"></button>
                        </div>

                        <form action="{{route('delete.avatar')}}"method="POST" id="form-delete-avatar">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="id" class="form-control" id="input-{{$user->id}}" value="{{$user->id}}">
                        </form>
                        <div class="modal fade " id="deleteUserAvatar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="deleteUserAvatarLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="deleteUserAvatarLabel">Delete avatar</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure you want to delete your avatar?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" form="form-delete-avatar" class="btn btn-primary">Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @else
                        <svg style="width: 200px; height: 200px;" viewBox="0 0 30 30" fill="none">
                            <path d="M10.5 14.625C9.465 14.625 8.625 15.465 8.625 16.5C8.625 17.535 9.465 18.375 10.5 18.375C11.535 18.375 12.375 17.535 12.375 16.5C12.375 15.465 11.535 14.625 10.5 14.625ZM19.5 14.625C18.465 14.625 17.625 15.465 17.625 16.5C17.625 17.535 18.465 18.375 19.5 18.375C20.535 18.375 21.375 17.535 21.375 16.5C21.375 15.465 20.535 14.625 19.5 14.625ZM15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM15 27C8.385 27 3 21.615 3 15C3 14.565 3.03 14.13 3.075 13.71C6.615 12.135 9.42 9.24 10.89 5.655C13.605 9.495 18.075 12 23.13 12C24.3 12 25.425 11.865 26.505 11.61C26.82 12.675 27 13.815 27 15C27 21.615 21.615 27 15 27Z" fill="{{$user->color}}"/>
                        </svg>
                    @endif
                </div>
                <form action="{{route('uploadAvatar', ['id' => $user->id])}}"  id="avatarImageUploadForm" method="POST" enctype="multipart/form-data" class="mt-4">
                    @csrf
                    <div class="d-flex justify-content-center">
                        <label class="btn btn-light w-100" for="avatarImageUpload">Update</label>
                        <input type="file"  name="image" id="avatarImageUpload" style="display: none;">
                    </div>
                </form>
            </div>
            <div class="flex-fill p-4">
                <h2>{{$user->name}}</h2>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span >Email:</span>
                    <span>{{$user->email}}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span >Member since:</span>
                    <span>{{date('d.m.Y', strtotime($user->created_at))}}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span>Color:</span>
                        <svg class="ps-1" width="27px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="{{$user->color}}" />
                        </svg>
                </div>
            </div>
        </div>
    </main>
@endsection
