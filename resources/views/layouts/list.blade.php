@extends('layouts.master')
@section('content')
    <main class="container py-4 flex-shrink-0">
    <h2 class="m-4">{{ $header }}</h2>
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
                    </li>
                @endforeach
            </ol>
            <div class="d-flex justify-content-center m-4 mt-auto p-2 bd-highlight">{{ $items->links()}}</div>
    </main>
@endsection
