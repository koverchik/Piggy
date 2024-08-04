<form action="{{route($status.'.'.$type.'.delete')}}" method="POST" id="form-{{$status}}-{{$id}}">
    @csrf
    <input type="hidden" name="id" class="form-control" id="input-id" value="{{$id}}">
</form>
<div class="modal fade" id="static-{{$id}}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="static-{{$id}}-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="static-{{$id}}-label">Delete</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @if($status === 'active')
                    Are you sure you want move to trash "{{ $name }}" {{$type}}?
                @else
                    Are you sure you want to delete "{{ $name }}" {{$type}}?
                @endif
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" form="form-{{$status}}-{{$id}}" class="btn btn-primary">Delete</button>
            </div>
        </div>
    </div>
</div>
