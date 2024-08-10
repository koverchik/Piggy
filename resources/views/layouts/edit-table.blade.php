@extends('layouts.master')
@section('content')
    <main class="container-md py-4 flex-shrink-0">
        <div class="d-flex justify-content-between align-items-center">
            <h2 class="m-4">{{Str::title($type)}} {{ $items->name }}</h2>
        </div>
        @include('layouts.table', ['id'=> $items, 'total' => $total])
        <table class="table table-borderless">
            <form action="{{route('add.'.$type.'.table', [ "id" => $items->id])}}" method="POST">
                @csrf
                <input type="hidden" name="{{$type}}_id" class="form-control" value="{{$items->id}}">
                <tr>
                    <td width="90%">
                        <input type="text" name="name" class="form-control" id="input-name">
                        @foreach($errors->getBag('default')->get('name') as $error)
                            <div class="text-danger fs-6">{{ $error }} </div>
                        @endforeach
                    </td>
                    <td class="text-end">
                        <input type="text" name="amount" class="form-control" id="input-name">
                        @foreach($errors->getBag('default')->get('amount') as $error)
                            <div class="text-danger fs-6">{{ $error }} </div>
                        @endforeach
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button class="btn btn-primary w-100" type="submit">Add</button>
                    </td>
                </tr>
            </form>
        </table>
    </main>
@endsection
