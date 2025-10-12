<h2 class="mb-4">{{ Str::title($type) }}</h2>
<ul class="nav nav-pills m-2">
    <li class="nav-item">
        <a class="nav-link {{$status == "active" ? "active" :""}}" aria-current="page" href="{{ route($type.'.index') }}">Active</a>
    </li>
    <li class="nav-item">
        <a class="nav-link {{$status == "delete" ? "active" :""}}" aria-current="page" href="{{ url($type.'-list-trash') }}">Deleted</a>
    </li>
</ul>
