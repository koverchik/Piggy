@extends('layouts.master')
@section('content')
    <main class="container py-4 flex-shrink-0">
        <div class="d-flex flex-row justify-content-between align-items-md-stretch">
            <div class="p-4">
                <div class="m-6">
                    @include('members.user-picture', ['user' => $user, 'width' => 200, 'height' => 200])
                </div>
            </div>
            <div class="flex-fill p-4">
                <h2>{{$user->name}}</h2>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span >Email:</span>
                    <span>{{$user->email}}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span>Color:</span>
                    <svg class="ps-1" width="27px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5" cy="5" r="5" fill="{{$user->color}}" />
                    </svg>
                </div>
            </div>
        </div>
        @if($wallets->count() > 0)
            <h2 class="text-center m-3">Linked wallets</h2>
            @include('tables.member-table',  ['data' => $wallets, 'routeName' => 'wallet.show'])
        @endif
        @if($deletedWallets->count() > 0)
            <h2 class="text-center m-3">Linked deleted wallets</h2>
            @include('tables.member-table',  ['data' => $deletedWallets])
        @endif
        @if($budgets->count() > 0)
            <h2 class="text-center m-3">Linked budgets</h2>
            @include('tables.member-table',  ['data' => $budgets, 'routeName' => 'budget.show'])
        @endif
        @if($deletedBudgets->count() > 0)
            <h2 class="text-center m-3">Linked deleted budgets</h2>
            @include('tables.member-table',  ['data' => $deletedBudgets])
        @endif
        <div style="height: 72px"></div>
    </main>
@endsection
