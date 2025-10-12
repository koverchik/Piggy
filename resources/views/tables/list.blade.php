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
        @include('tables.tabs', ['type' => $type, 'status' => $status])
        <ol class="mt-auto p-2 bd-highlight">
            @foreach ($items as $item)
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="ms-2 me-auto">
                        <a href="{{ route($type.'.show', [$type => $item->id]) }}"
                           class="link-dark text-decoration-none">{{ $item->name }}</a>
                    </div>
                    <div class="m-2 text-muted">{{$item->status}}</div>
                    @if($status === 'active')
                        <a href="{{route($type.'.update', [ $type => $item->id])}}">
                            <span class="badge bg-light m-1 cursor-pointer">
                                 <img src="{{ asset('images/pencil.svg') }}" class="m-1"/>
                            </span>
                        </a>
                    @else
                        <span class="badge bg-light m-1 cursor-pointer modal-button"
                              data-bs-toggle="modal"
                              role="button"
                              tabindex="0"
                              data-bs-target="#restore-{{$item->id}}"
                              data-id="{{$item->id}}"
                              data-name="{{$item->name}}"
                              data-message=" Are you sure you want restore '{{$item->name}}'"
                              data-action="restore"
                              data-pathname="{{route("$type.restore", [$type => $item->id])}}"
                              data-title="Restore">
                                <img src="{{ asset('images/trash-restore-alt.svg') }}" class="m-1"/>
                            </span>
                    @endif
                    @if($status === 'active')
                        <span class="badge bg-light m-1 modal-button"
                              role="button"
                              tabindex="0"
                              data-bs-toggle="modal"
                              data-bs-target="#trash-{{$item->id}}"
                              data-id="{{$item->id}}"
                              data-name="{{$item->name}}"
                              data-message=" Are you sure you want move to trash '{{$item->name}}'"
                              data-action="trash"
                              data-pathname="{{route("$type.trash", [$type => $item->id])}}"
                              data-title="To trash">
                                <img src="{{ asset('images/move-to-trash.svg') }}" class="m-1"/>
                            </span>
                    @else
                        <span class="badge bg-light m-1 cursor-pointer modal-button"
                              role="button"
                              tabindex="0"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-{{$item->id}}"
                              data-id="{{$item->id}}"
                              data-name="{{$item->name}}"
                              data-message="Are you sure you want to delete '{{$item->name}}'"
                              data-action="delete"
                              data-pathname="{{route("$type.destroy", [$type => $item->id])}}"
                              data-title="Delete">
                                <img src="{{ asset('images/trash.svg') }}" class="m-1"/>
                            </span>
                    @endif
                </li>
            @endforeach
        </ol>
        @include('modals.action')
    </main>
@endsection
