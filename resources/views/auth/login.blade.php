@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0 mb-5">
        <div class="row align-items-center justify-content-md-center">
            <div class="col-md-6 m-5">
                <div class="h-100 p-5 bg-light rounded-3 custom-container-card">
                    <div class="form">
                        <h3 class="mb-5">Login</h3>
                        <form action="{{route('login.submit')}}" method="POST">
                            @csrf
                            <div class="mb-3 row">
                                <label for="input-email" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="text" name="email" class="form-control" id="input-email" autocomplete="email">
                                    @foreach($errors->getBag('default')->get('email') as $error)
                                        <div class="text-danger fs-6">{{ $error }} </div>
                                    @endforeach
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="input-password" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" name="password" class="form-control" id="input-password" autocomplete="password">
                                    @foreach($errors->getBag('default')->get('password') as $error)
                                        <div class="text-danger fs-6">{{ $error }} </div>
                                    @endforeach
                                </div>
                            </div>
                            <p class="text-end">
                                <a class="text-reset"  href="{{ url('restore') }}">Forgot Password?</a>
                            </p>
                            <div class="d-grid gap-2 col-6 mx-auto mt-4">
                                <button class="btn btn-primary btn-lg" type="submit">Sign In</button>
                            </div>
                        </form>
                        <p class="text-center mt-3">
                            Not a member? <a class="text-reset"  href="{{ url('register') }}">SignUp</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
