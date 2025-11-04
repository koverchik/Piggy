<table class="table">
    <thead class="table-light">
    <th scope="col" width="50%">Name</th>
    <th scope="col" width="15%" class="text-center">Permissions</th>
    <th scope="col" width="15%" class="text-center">Status</th>
    <th scope="col" width="20%" class="text-center">Last update</th>
    </thead>
    <tbody>
    @foreach($data as $item)
        <tr>
            <td class="align-middle">
                @if(isset($routeName))
                    <a href="{{route($routeName, $item->id)}}"
                       class="d-inline-flex focus-ring px-2 text-decoration-none">
                        {{ Str::ucfirst($item->name) }}
                    </a>
                @else
                    {{ Str::ucfirst($item->name) }}
                @endif
            </td>
            <td class="align-middle text-center">{{$item->pivot->permissions}}</td>
            <td class="align-middle text-center">{{$item->status}}</td>
            <td class="align-middle text-center">{{$item->updated_at->format('j M, y h:i A')}}</td>
        </tr>
    @endforeach
    </tbody>
</table>



