@extends('layouts.master')
@php
    $url = parse_url(url()->current());
    $isDeletedPage = str_contains($url['path'], 'trash');
    if($isDeletedPage){
        $status = 'delete';
    }else{
        $status = 'active';
    }
@endphp

@section('content')
    <main class="container py-4 flex-shrink-0">
        @include('layouts.header_list', ['header' => $header, 'type' => $type, 'status' => $status])
            <ol class="mt-auto p-2 bd-highlight">
                @foreach ($items as $item)
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="ms-2 me-auto">
                            <a href="#" class="link-dark text-decoration-none">{{ $item->name }}</a>
                        </div>
                        @if($status === 'active')
                            <a href="#">
                                <span class="badge bg-light">
                                     <img src="{{ asset('images/pencil.svg') }}" class="m-1"/>
                                </span>
                            </a>
                        @else
                            <span class="badge bg-light m-1 cursor-pointer"  data-bs-toggle="modal" data-bs-target="#restore-{{$item->id}}">
                                <img src="{{ asset('images/trash-restore-alt.svg') }}" class="m-1"/>
                            </span>
                        @endif
                        @if($status === 'active')
                            <span class="badge bg-light m-1 cursor-pointer"  data-bs-toggle="modal" data-bs-target="#static-{{$item->id}}">
                                <img src="{{ asset('images/move-to-trash.svg') }}" class="m-1"/>
                            </span>
                        @else
                            <span class="badge bg-light m-1 cursor-pointer"  data-bs-toggle="modal" data-bs-target="#static-{{$item->id}}">
                                <img src="{{ asset('images/trash.svg') }}" class="m-1"/>
                            </span>
                        @endif
                        @include('layouts.modal', ['id'=> $item->id, 'name' => $item->name, 'type' => $type, 'status' => $status])
                    </li>
                @endforeach
            </ol>
{{--            <div class="d-flex justify-content-center m-4 mt-auto p-2 bd-highlight">{{ $items}}</div>--}}
    </main>
@endsection
