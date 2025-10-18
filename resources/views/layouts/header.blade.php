<div class="navbar navbar-light bg-light" role="navigation">
    <div class="navbar-header header-custom-style">
        <img src="{{ asset('images/image-for-header.png') }}" width="auto" alt="logo"/>
        <h1 class="big-logo">
            <a class="link-dark text-decoration-none" aria-current="page" href="{{ url('main') }}">Bill split</a>
        </h1>
    </div>
    <ul class="nav justify-content-end">
        <li class="nav-item">
            @auth
                <a class="nav-link m-4" href="{{ url('user') }}">Hi, {{ Auth::user()->name }}!</a>
            @endauth
            @guest
                <a class="nav-link m-4" href="{{ url('login') }}">Sign in</a>
            @endguest
        </li>
    </ul>
</div>
