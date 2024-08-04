@extends('layouts.master')
@section('content')
    <main class="container py-4 flex-shrink-0">
    <h2 class="m-4">{{ $header }}</h2>
        <ul class="nav nav-pills m-2">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="{{ url($type.'-list') }}">Active</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="{{ url($type.'-list-trash') }}">Deleted</a>
            </li>
        </ul>
            <ol class="mt-auto p-2 bd-highlight">
                @foreach ($items as $item)
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="ms-2 me-auto">
                            <a href="#" class="link-dark text-decoration-none">{{ $item->name }}</a>
                        </div>
                        <a href="#">
                            <span class="badge bg-light">
                                 <img src="{{ asset('images/pencil.svg') }}" class="m-1"/>
                            </span>
                        </a>
                        <span class="badge bg-light m-1"  data-bs-toggle="modal" data-bs-target="#static-{{$item->id}}">
                                <img src="{{ asset('images/trash.svg') }}" class="m-1"/>
                        </span>
                        @include('layouts.modal', ['id'=> $item->id, 'name' => $item->name, 'type' => $type])
                    </li>
                @endforeach
            </ol>
{{--            <div class="d-flex justify-content-center m-4 mt-auto p-2 bd-highlight">{{ $items}}</div>--}}
    </main>
@endsection
