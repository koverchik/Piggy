<h2 class="m-4">{{ $header }}</h2>
<ul class="nav nav-pills m-2">
    <li class="nav-item">
        <a class="nav-link {{$status == "active" ? "active" :""}}" aria-current="page" href="{{ url($type.'-list') }}">Active</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {{$status == "delete" ? "active" :""}}" aria-current="page" href="{{ url($type.'-list-trash') }}">Deleted</a>
    </li>
</ul>
