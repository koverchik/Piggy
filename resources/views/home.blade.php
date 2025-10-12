@extends('layouts.cards')
@section('left-column')
    <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
        <a href="{{ route('wallet.index') }}" class="text-center text-decoration-none h2 mb-4 link-dark">Wallet</a>
        @if (count($wallets) > 0)
            <div class="d-flex flex-column justify-content-between h-100">
                <div class="d-flex flex-column">
                    @foreach ($wallets as $wallet)
                        <a href="{{route('wallet.show', ['wallet' => $wallet->id])}}" class="d-inline-flex py-1 px-2 text-decoration-none m-2">
                            {{ $wallet->name }}
                        </a>
                    @endforeach
                </div>
                <div class="align-self-center mt-3">
                    {{$wallets->links()}}
                </div>
            </div>
        @else
            <img src="{{ asset('images/estimate.svg') }}" class="m-4 rounded mx-auto d-block" />
            <p>The Wallet section is your go-to for monitoring and managing your actual expenses.
                Keep a detailed record of all your spending, create items for each expense, and split costs among users for better transparency and shared accountability.</p>
            <p> With the Wallet, you'll have a clear view of your financial outflows, helping you stay informed and in control of your money.</p>
        @endif
        <div class="custom-btn-create mt-4">
            <a href="{{route('wallet.create')}}" class="btn btn-outline-info" role="button">Create</a>
        </div>
    </div>
@endsection
@section('right-column')
    <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
        <a href="{{ route('budget.index') }}" class="text-center text-decoration-none h2 mb-4 link-dark">Budget</a>
        @if (count($budgets) > 0)
            <div class="d-flex flex-column justify-content-between h-100">
                <div class="d-flex flex-column">
                    @foreach ($budgets as $budget)
                        <a href="{{route('budget.show', ['budget' => $budget->id])}}" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none m-2">
                            {{ $budget->name }}
                        </a>
                    @endforeach
                </div>
                <div class="align-self-center mt-3">
                    {{$budgets->links()}}
                </div>
            </div>
        @else
        <img src="{{ asset('images/wallet.svg') }}" class="m-4 rounded mx-auto d-block" />
        <p >The Budget section helps you organize and plan for future expenses.
            Here, you can create and manage budget items, ensuring you stay on track with your financial goals. Allocate funds for upcoming purchases, events, or projects, and keep an eye on your planned expenditures. </p>
        <p >With detailed insights and the ability to split budget items among users, you can collaborate and ensure everyone is aligned with the financial plans.</p>
        @endif
        <div class="custom-btn-create mt-4">
            <a href="{{ route('budget.create') }}" class="btn btn-outline-info" role="button">Create</a>
        </div>
    </div>
@endsection
