<div class="container py-5">
    <div class="modal fade" id="memberInvite" tabindex="-1" aria-labelledby="memberInviteLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="memberInviteLabel">Send an invitation email</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="{{ route("members.$type.add", ['id' => $id]) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" id="name" aria-describedby="nameHelp">
                            <div id="nameHelp" class="form-text">Enter the name of the person you want to invite</div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input class="form-control" id="email" name="email" aria-describedby="emailHelp">
                            <div id="emailHelp" class="form-text">Enter the email so we can send an invitation to this
                                person
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="inputGroupSelectLevel">Permissions</label>
                            <select class="form-select" id="inputGroupSelectLevel" name="permissions">
                                @foreach(\App\Enums\UserRole::cases() as $role)
                                    @if($role->value != \App\Enums\UserRole::OWNER->value)
                                        <option value="{{ $role->value }}">
                                            {{ Str::title($role->value) }}
                                        </option>
                                    @endif
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Invite</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
