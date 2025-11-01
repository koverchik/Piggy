@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0 mb-5">
        <div class="row align-items-md-stretch">
            <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-start">
                    <h2 class="mb-4">
                        <a href="{{ route("$type.show", [$type => $id]) }}" class="link-primary text-decoration-none">
                            Members {{$type}} {{ $name }}
                        </a>
                    </h2>
                </div>
                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
                @include('members.edit-members')
            </div>
        </div>
    </main>
@endsection
