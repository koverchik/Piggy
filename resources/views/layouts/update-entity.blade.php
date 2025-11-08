@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0 mb-5">
        <div class="row align-items-center justify-content-md-center">
            <div class="col-12 col-lg-8 p-5 mb-3 bg-light rounded-3 custom-container-card">
                <div class="form">
                    <form action="{{route($type.'.update', [$type => $entity->id])}}" method="POST">
                        @method("PUT")
                        @csrf
                        <div class="mb-3 row">
                            <label for="input-name" class="col-12 col-form-label">
                                <h2 class="mb-4 text-primary">
                                    Name
                                </h2>
                            </label>
                            <div class="col-12">
                                <input type="text" name="name" class="form-control " id="input-name"
                                       value="{{$entity->name}}">
                                @foreach($errors->getBag('default')->get('name') as $error)
                                    <div class="text-danger fs-6">{{ $error }} </div>
                                @endforeach
                            </div>
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto mt-4">
                            <button class="btn btn-primary btn-lg" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-12 col-lg-8 p-5 mb-3  bg-light rounded-3 custom-container-card">
                <h2 class="mb-4">
                    <a href="{{ route("members.$type.table", [ $type => $entity->id])}}"
                       class="link-primary text-decoration-none">
                        Members
                    </a>
                </h2>
                @include('members.table-manage', ['item' => $entity])
            </div>
            <div class="col-12 col-lg-8 p-5 bg-light rounded-3 custom-container-card">
                <span class="btn btn-danger m-1 modal-button"
                      role="button"
                      tabindex="0"
                      data-bs-toggle="modal"
                      data-bs-target="#trash-{{$entity->id}}"
                      data-id="{{$entity->id}}"
                      data-name="{{$entity->name}}"
                      data-message=" Are you sure you want move to trash '{{$entity->name}}'"
                      data-action="trash"
                      data-pathname="{{route("$type.trash", [$type => $entity->id])}}"
                      data-title="To trash">
                    Move the table to the trash
                </span>
            </div>
        </div>
    </main>
    @include('modals.action')
    <div style="height: 72px"></div>
@endsection
