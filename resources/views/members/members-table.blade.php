@extends('layouts.master')
@section('content')
<main class="container-md py-4 flex-shrink-0 mb-5">
    <div class="row align-items-md-stretch">
        <div class="col-md-12">
            <div class="d-flex justify-content-between align-items-start">
                <h2 class="mb-4">Members {{$type}} {{ $name }}</h2>
            </div>
            @include('members.edit-members')
            </div>
        </div>
    </div>
</main>
@endsection
