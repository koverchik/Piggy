<div class="modal fade" id="delete-member-{{$item->id}}" tabindex="-1"
     aria-labelledby="deleteMember{{$item->id}}Label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteMember{{$item->id}}Label">Remove member</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to remove the user <b>{{$item->name}}</b>?
                    All data entered by this user in this table will be deleted.</p>
            </div>
            <form action="{{ route("members.$type.delete", ['id' => $id, 'user' => $item->id]) }}"
                  method="POST">
                @csrf
                @method('DELETE')
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                </div>
            </form>
        </div>
    </div>
</div>
