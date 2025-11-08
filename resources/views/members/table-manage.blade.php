<table class="table">
    <thead class="table-secondary">
    <th scope="col" width="5%"></th>
    <th scope="col" width="75%">Name</th>
    <th scope="col" width="10%" class="text-end">Color</th>
    <th scope="col" width="10%" class="text-end"></th>
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
            <td>
                @if(Auth::user()->id !== $item->id)
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
                                <form
                                    action="{{ route("$type.invite.resend", ['id' => $entity->id, 'user' => $item->id]) }}"
                                    method="POST">
                                    @csrf
                                    @method('PATCH')
                                    <button class="btn dropdown-item" type="submit">Resend invitation</button>
                                </form>
                            @endif
                        </ul>
                    </div>
                    @include('members.delete-user-pop-up', ['id' => $entity->id, 'user' => $item->id])
                    @if ($item->pivot->status === \App\Enums\InviteStatus::APPROVED->value )
                        @include('members.change-permission-user-pop-up', ['id' => $entity->id, 'user' => $item->id])
                    @endif
                @endif
            </td>
        </tr>
    @endforeach
    </tbody>
</table>

