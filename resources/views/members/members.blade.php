<table class="table">
    <thead class="table-light">
        <th scope="col"  width="5%"></th>
        <th scope="col" width="85%">Name</th>
        <th scope="col" width="10%" class="text-end">Color</th>
    </thead>
    <tbody>
    @foreach($items->members as $item)
        <tr>
            <td>
                @if($item->avatar !== null)
                    <img src="{{ asset('storage/avatars/'.$item->avatar) }}" class="m-1 cursor-pointer"/>
                @else
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M10.5 14.625C9.465 14.625 8.625 15.465 8.625 16.5C8.625 17.535 9.465 18.375 10.5 18.375C11.535 18.375 12.375 17.535 12.375 16.5C12.375 15.465 11.535 14.625 10.5 14.625ZM19.5 14.625C18.465 14.625 17.625 15.465 17.625 16.5C17.625 17.535 18.465 18.375 19.5 18.375C20.535 18.375 21.375 17.535 21.375 16.5C21.375 15.465 20.535 14.625 19.5 14.625ZM15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM15 27C8.385 27 3 21.615 3 15C3 14.565 3.03 14.13 3.075 13.71C6.615 12.135 9.42 9.24 10.89 5.655C13.605 9.495 18.075 12 23.13 12C24.3 12 25.425 11.865 26.505 11.61C26.82 12.675 27 13.815 27 15C27 21.615 21.615 27 15 27Z" fill="{{$item->color}}"/>
                    </svg>
                @endif
            </td>
            <td class="align-middle">{{$item->name}}</td>
            <td class="text-center">
                <svg width="27px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="5" r="5" fill="{{$item->color}}" />
                </svg>
            </td>
        </tr>
    @endforeach
    </tbody>
</table>

