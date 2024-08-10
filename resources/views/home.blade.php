@extends('layouts.cards')
@section('left-column')
    <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
        <a href="{{ url('wallet-list') }}" class="text-center text-decoration-none h2 mb-4 link-dark">Wallet</a>
        @if (count($wallets) > 0)
            @foreach ($wallets as $wallet)
                <a href="{{route('wallet.table', ['id' => $wallet->id])}}" class="d-inline-flex py-1 px-2 text-decoration-none m-2">
                    {{ $wallet->name }}
                </a>
            @endforeach
        @else
            <img src="{{ asset('images/estimate.svg') }}" class="m-4 rounded mx-auto d-block" />
            <p>The Wallet section is your go-to for monitoring and managing your actual expenses.
                Keep a detailed record of all your spending, create items for each expense, and split costs among users for better transparency and shared accountability.</p>
            <p> With the Wallet, you'll have a clear view of your financial outflows, helping you stay informed and in control of your money.</p>
        @endif
        <div class="custom-btn-create mt-4">
            <a href="{{ url('wallet') }}" class="btn btn-outline-info" role="button">Create</a>
        </div>
    </div>
@endsection
@section('right-column')
    <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
        <a href="{{ url('budget-list') }}" class="text-center text-decoration-none h2 mb-4 link-dark">Budget</a>
        @if (count($budgets) > 0)
            @foreach ($budgets as $budget)
                <a href="{{route('budget.table', ['id' => $budget->id])}}" class="d-inline-flex focus-ring py-1 px-2 text-decoration-none m-2">
                    {{ $budget->name }}
                </a>
            @endforeach
        @else
        <img src="{{ asset('images/wallet.svg') }}" class="m-4 rounded mx-auto d-block" />
        <p >The Budget section helps you organize and plan for future expenses.
            Here, you can create and manage budget items, ensuring you stay on track with your financial goals. Allocate funds for upcoming purchases, events, or projects, and keep an eye on your planned expenditures. </p>
        <p >With detailed insights and the ability to split budget items among users, you can collaborate and ensure everyone is aligned with the financial plans.</p>
        @endif
        <div class="custom-btn-create mt-4">
            <a href="{{ url('budget') }}" class="btn btn-outline-info" role="button">Create</a>
        </div>
    </div>
@endsection
