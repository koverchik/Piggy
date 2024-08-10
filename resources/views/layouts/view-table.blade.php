@extends('layouts.master')
@section('content')
<main class="container-md py-4 flex-shrink-0">
    <div class="d-flex justify-content-between align-items-center">
        <h2 class="m-4">{{ Str::title($type) }} {{ $items->name }}</h2>
        <a href="{{ url('/'.$type .'/' . $items->id . '/edit') }}" >
                <span class="badge bg-light m-1 cursor-pointer rounded-4" role="button" tabindex="0">
                    <img src="{{ asset('images/pencil.svg') }}" class="m-1 cursor-pointer "/>
                </span>
        </a>
    </div>
    @include('layouts.table')
</main>
@endsection
