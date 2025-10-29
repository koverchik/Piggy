@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0 mb-5">
        <div class="row align-items-center justify-content-md-center">
            <div class="col-md-6 m-5">
                <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
                    <div class="form">
                        <h3 class="mb-5">Unsubscribe</h3>
                        <form action="{{route('unsubscribe.submit')}}" method="POST">
                            @csrf
                            <p>Are you sure you want to unsubscribe from the mailing list? No one will be able to send you invitations from our service.</p>
                            <div class="d-grid gap-2 col-6 mx-auto mt-4">
                                <button class="btn btn-primary btn-lg" type="submit">Unsubscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
