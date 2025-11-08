<div class="navbar navbar-light bg-light" role="navigation">
    <div class="navbar-header header-custom-style">
        <a class="link-dark text-decoration-none" href="{{ route('main') }}" style="height: inherit">
            <img src="{{ asset('images/image-for-header.png') }}"
                 alt="logo"/>
        </a>
        <h1 class="big-logo">
            <a class="link-dark text-decoration-none" aria-current="page" href="{{ route('main') }}">Bill split</a>
        </h1>
    </div>
    <ul class="nav justify-content-end">
        <li class="nav-item d-flex align-items-center">
            @auth
                @include('members.user-picture', ['user' => Auth::user()])
                <a class="nav-link mr-4" href="{{ url('user') }}">
                     {{ Auth::user()->name }}
                </a>
            @endauth
            @guest
                <a class="nav-link m-4" href="{{ url('login') }}">Sign in</a>
            @endguest
        </li>
    </ul>
</div>
