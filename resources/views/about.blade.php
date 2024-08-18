@extends('layouts.master')
@section('content')
    <main class="container py-4 flex-shrink-0">
        <div class="row align-items-md-stretch">
            <div class="col-md-6">
                <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
                    <h2 class="text-center">Wallet</h2>
                    <img src="{{ asset('images/estimate.svg') }}" class="m-4 rounded mx-auto d-block">
                    <p>The Wallet section is your go-to for monitoring and managing your actual expenses.
                        Keep a detailed record of all your spending, create items for each expense, and split costs among users for better transparency and shared accountability.</p>
                    <p > With the Wallet, you'll have a clear view of your financial outflows, helping you stay informed and in control of your money.</p>
                    <div class="custom-btn-create mt-4">
                        <a href="{{ url('wallet') }}" class="btn btn-outline-info" role="button">Create</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
                    <h2 class="text-center">Budget</h2>
                    <img src="{{ asset('images/wallet.svg') }}" class="m-4 rounded mx-auto d-block">
                    <p >The Budget section helps you organize and plan for future expenses.
                        Here, you can create and manage budget items, ensuring you stay on track with your financial goals. Allocate funds for upcoming purchases, events, or projects, and keep an eye on your planned expenditures. </p>
                    <p >With detailed insights and the ability to split budget items among users, you can collaborate and ensure everyone is aligned with the financial plans.</p>
                    <div class="custom-btn-create">
                        <a href="{{ url('budget') }}" class="btn btn-outline-info" role="button">Create</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
