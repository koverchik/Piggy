<table class="table">
    <thead class="table-light">
    <th scope="col" width="5%"></th>
    <th scope="col" width="45%" class="align-middle text-center">Debit</th>
    <th scope="col" width="45%" class="align-middle text-center">Credit</th>
    </thead>
    <tbody>
    @foreach($calculation as $item)
        @if(Auth::user()->id != $item['user']->id)
            <tr>
                <td>
                    @include('members.user-picture', ['user' => $item['user']])
                </td>
                <td class="align-middle text-center">{{$item['debit']}}</td>
                <td class=" align-middle text-center">
                    {{$item['credit']}}
                </td>
            </tr>
        @endif
    @endforeach
    </tbody>
</table>
<div style="height: 72px"></div>
