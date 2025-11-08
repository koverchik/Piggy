@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0 mb-5">
        <div class="row align-items-md-stretch">
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-start">
                    <h2 class="mb-4">
                        <a href="{{ route("index.$type.rows", [$type => $item->id]) }}"
                           class="link-primary text-decoration-none">
                            {{ Str::title($type) }} {{ $item->name }}
                        </a>
                    </h2>
                    <div>
                        <div class="dropdown">
                            <button class="btn btn-light dropdown-toggle" type="button"
                                    id="dropdownActionTableMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="{{ asset('images/list-premision.svg') }}" class="m-1" alt="permission"/>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownActionTableMenuButton">
                                <li>
                                    <a href="{{ route('index.'.$type.'.rows', [$type => $item->id]) }}"
                                       class="dropdown-item">
                                        Add rows
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="{{ route("$type.edit", [$type => $item->id]) }}">
                                        Update
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">Download</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                @include('tables.table')
            </div>
            <div class="col-md-4">

                <div class="d-flex justify-content-between align-items-start">
                    <h2 class="mb-4">Calculation</h2>
                </div>
                @include('tables.calculation')
                <div class="d-flex justify-content-between align-items-start">
                    <h2 class="mb-4">
                        <a href="{{ route("members.$type.table", [ $type => $item->id])}}"
                           class="link-primary text-decoration-none">
                            Members
                        </a>
                    </h2>
                    <a href="{{ url('/'.$type. '/' .$item->id.'/'.'members') }}">
                        <button class="btn btn-light m-1" type="button">
                            <img src="{{ asset('images/pencil.svg') }}" class="m-1 cursor-pointer" alt="icon edit"/>
                        </button>
                    </a>
                </div>
                @include('members.table-list')
            </div>
        </div>
    </main>
@endsection
