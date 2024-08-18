@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0 mb-5">
        <div class="row align-items-md-stretch">
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-start">
                    <h2 class="mb-4">{{ Str::title($type) }} {{ $items->name }}</h2>
                    <div>
                        <a href="{{ route('index.'.$type.'.rows', [$type => $items->id]) }}" class="text-decoration-none">
                            <span class="badge bg-light m-1 cursor-pointer rounded-4" role="button" tabindex="0">
                                <img width="20px" src="{{ asset('images/add-row.svg') }}" class="m-1 cursor-pointer"/>
                            </span>
                        </a>
                        <a href="{{ url('/'.$type .'/' . $items->id . '/edit') }}" class="text-decoration-none">
                            <span class="badge bg-light m-1 cursor-pointer rounded-4" role="button" tabindex="0">
                                <img  width="20px" src="{{ asset('images/pencil.svg') }}" class="m-1 cursor-pointer"/>
                            </span>
                        </a>
                    </div>
                </div>
                @include('tables.table')
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between align-items-start">
                    <h2 class="mb-4">Members</h2>
                    <a href="{{ url('/'.$type .'/'.'members/'. $items->id ) }}">
                    <span class="badge bg-light m-1 cursor-pointer rounded-4" role="button" tabindex="0">
                        <img src="{{ asset('images/pencil.svg') }}" class="m-1 cursor-pointer"/>
                    </span>
                    </a>
                </div>
                @include('members.members')
            </div>
        </div>
    </main>
@endsection
