<div class="modal fade" id="change-permission-member-{{$item->id}}" tabindex="-1"
     aria-labelledby="changePermissionMember{{$item->id}}Label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changePermissionMember{{$item->id}}Label">Change Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <form action="{{ route("members.$type.changePermission", ['id' => $id, 'user' => $item->id]) }}"
                  method="POST">
                @csrf
                @method('PATCH')

                <div class="modal-body">
                    <p>Select a role for the user <b>{{ $item->name }}</b> from the dropdown below.</p>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Level</label>
                        <select class="form-select" id="inputGroupSelect01" name="permissions">
                            @foreach(\App\Enums\UserRole::cases() as $role)
                                @if($role->value != \App\Enums\UserRole::OWNER->value)
                                    <option value="{{ $role->value }}"
                                            @if($item->pivot->permissions == $role->value) selected @endif>
                                        {{ Str::title($role->value) }}
                                    </option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>

        </div>
    </div>
</div>
