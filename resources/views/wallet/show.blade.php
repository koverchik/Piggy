@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0 mb-5">
        <div class="row align-items-md-stretch">
            <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-start">
                    <h2 class="mb-4">{{ Str::title($type) }} {{ $items->name }}</h2>
                    <a href="{{ ('/'.$type.'-data'.'/' . $items->id . '/create') }}">
                    <span class="badge bg-light m-1 cursor-pointer rounded-4" role="button" tabindex="0">
                        <img src="{{ asset('images/pencil.svg') }}" class="m-1 cursor-pointer"/>
                    </span>
                    </a>
                </div>
                @include('tables.table')
            </div>
        </div>
    </main>
@endsection
