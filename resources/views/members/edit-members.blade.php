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
                @include('members.user-picture', ['user' => $item])
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
