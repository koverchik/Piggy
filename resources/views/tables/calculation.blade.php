<table class="table">
    <thead class="table-light">
    <th scope="col"  width="5%" ></th>
    <th scope="col" width="45%" class="align-middle text-center">Debit</th>
    <th scope="col" width="45%" class="align-middle text-center">Credit</th>
    </thead>
    <tbody>
    @foreach($calculation as $item)
        <tr>
            <td>
                @include('members.user-picture', ['user' => $item['user']])
            </td>
            <td class="align-middle text-center">{{$item['debit']}}</td>
            <td class=" align-middle text-center">
                {{$item['credit']}}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>
