@extends('layouts.master')
@section('content')
    <main class="container py-4 flex-shrink-0">
        <div class="row align-items-md-stretch">
            <div class="col-md-6 ">
                @yield('left-column')
            </div>
            <div class="col-md-6">
                @yield('right-column')
            </div>
        </div>
    </main>
@endsection
