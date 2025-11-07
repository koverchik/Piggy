    <table class="table">
        <thead class="table-light">
        <th scope="col"  width="5%"></th>
        <th scope="col" width="65%">Name</th>
        <th scope="col" width="20%">Date</th>
        <th scope="col" width="5%" class="text-end">Сost</th>
        </thead>
        <tbody>
        @foreach($data as $item)
            <tr>
                <td>
                    @include('members.user-picture', ['user' => $item->user])
                </td>
                <td class="align-middle">{{$item->name}}</td>
                <td class="align-middle">{{$item->updated_at->format('j M, y h:i A')}}</td>
                <td class="text-end align-middle">{{$item->amount}}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <div class="d-flex justify-content-center">
        {{$data->links()}}
    </div>
    <table class="table">
        <thead>
        <tr>
            <td colspan="2" class="text-end align-middle">Total:</td>
            <td  width="10%"  class="text-end fw-bold align-middle">{{$total}}</td>
        </tr>
        </thead>
    </table>


