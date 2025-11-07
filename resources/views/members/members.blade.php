<table class="table">
    <thead class="table-light">
    <th scope="col" width="5%"></th>
    <th scope="col" width="85%">Name</th>
    <th scope="col" width="10%" class="text-end">Color</th>
    </thead>
    <tbody>
    @foreach($item->members as $item)
        <tr>
            <td>
                @include('members.user-picture', ['user' => $item])
            </td>
            <td class="align-middle">
                <a class="link-body-emphasis text-decoration-none"
                    href="{{ Auth::user()->id == $item->id ? route('user') : route('member', ['user' => $item->id]) }}">{{$item->name}}</a>
            </td>
            <td class="text-center">
                <svg width="27px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="5" r="5" fill="{{$item->color}}"/>
                </svg>
            </td>
        </tr>
    @endforeach
    </tbody>
</table>

