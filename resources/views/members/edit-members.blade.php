<table class="table">
    <thead class="table-light">
    <th scope="col" width="5%"></th>
    <th scope="col">Name</th>
    <th scope="col">Email</th>
    <th scope="col">Permissions</th>
    <th scope="col">Invited</th>
    <th scope="col">Status</th>
    <th scope="col" class="text-center">Color</th>
    @if($is_owner)
        <th scope="col" width="5%"></th>
    @endif
    </thead>
    @foreach($items as $item)
        <tbody>
        <tr>
            <td class="align-middle">
                <a href="{{route('userPage', ['id' => $item->id])}}">
                    @if($item->avatar !== null)
                        <img width="30" height="30" src="{{ asset('storage/avatars/'.$item->avatar) }}"
                             class="m-1 cursor-pointer" alt="Avatar"/>
                    @else
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path
                                d="M10.5 14.625C9.465 14.625 8.625 15.465 8.625 16.5C8.625 17.535 9.465 18.375 10.5 18.375C11.535 18.375 12.375 17.535 12.375 16.5C12.375 15.465 11.535 14.625 10.5 14.625ZM19.5 14.625C18.465 14.625 17.625 15.465 17.625 16.5C17.625 17.535 18.465 18.375 19.5 18.375C20.535 18.375 21.375 17.535 21.375 16.5C21.375 15.465 20.535 14.625 19.5 14.625ZM15 0C6.72 0 0 6.72 0 15C0 23.28 6.72 30 15 30C23.28 30 30 23.28 30 15C30 6.72 23.28 0 15 0ZM15 27C8.385 27 3 21.615 3 15C3 14.565 3.03 14.13 3.075 13.71C6.615 12.135 9.42 9.24 10.89 5.655C13.605 9.495 18.075 12 23.13 12C24.3 12 25.425 11.865 26.505 11.61C26.82 12.675 27 13.815 27 15C27 21.615 21.615 27 15 27Z"
                                fill="{{$item->color}}"/>
                        </svg>
                    @endif
                </a>
            </td>
            <td class="align-middle">{{$item->name}}</td>
            <td class="align-middle">{{$item->email}}</td>
            <td class="align-middle">{{$item->pivot->permissions}}</td>
            <td class="align-middle">{{date('d M Y', strtotime($item->pivot->updated_at))}}</td>
            <td class="align-middle">{{$item->pivot->status}}</td>
            <td class="text-center align-middle">
                <svg width="27px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="5" r="5" fill="{{$item->color}}"/>
                </svg>
            </td>
            @if($is_owner and $user->id !== $item->id)
                <td>
                    <div class="dropdown">
                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownActionMembersMenuButton"
                                data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="{{ asset('images/list-premision.svg') }}" class="m-1" alt="list icon"/>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownActionMembersMenuButton">
                            <li>
                                <button type="button" class="dropdown-item text-danger" data-bs-toggle="modal"
                                        data-bs-target="#delete-member-{{$item->id}}">Delete
                                </button>
                            </li>
                            @if ($item->pivot->status === \App\Enums\InviteStatus::APPROVED->value )
                                <li>
                                    <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                            data-bs-target="#change-permission-member-{{$item->id}}">Change permission
                                    </button>
                                </li>
                            @endif
                            @if (\Carbon\Carbon::parse($item->pivot->updated_at)->diffInDays(now()) > 1 and $item->pivot->status === \App\Enums\InviteStatus::INVITED->value )
                                <form action="{{ route("$type.invite.resend", ['id' => $id, 'user' => $item->id]) }}"
                                      method="POST">
                                    @csrf
                                    @method('PATCH')
                                    <button class="btn dropdown-item" type="submit">Resend invitation</button>
                                </form>
                            @endif
                        </ul>
                    </div>
                </td>
                @include('members.delete-user-pop-up')
                @if ($item->pivot->status === \App\Enums\InviteStatus::APPROVED->value )
                    @include('members.change-permission-user-pop-up')
                @endif
            @endif
        </tr>
        @endforeach
        </tbody>
</table>
<div class="flex-1 justify-end">
    <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#memberInvite">Invite</button>
</div>
@include('members.invite-pop-up')
