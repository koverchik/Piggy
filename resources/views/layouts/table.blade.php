<table class="table">
    <thead class="table-light">
        <th scope="col"  width="5%"></th>
        <th scope="col" width="85%">Name</th>
        <th scope="col" width="10%" class="text-end">Сost</th>
    </thead>
    <tbody>
    @foreach($items->data as $item)
        <tr>
            <td>
                <img src="{{ $item->user->avatar ?? asset('images/people.svg') }}" class="m-1 cursor-pointer" title="this will be displayed as a tooltip"/>
            </td>
            <td>{{$item->name}}</td>
            <td class="text-end">{{$item->amount}}</td>
        </tr>
    @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2" class="text-end">Total:</td>
            <td class="text-end fw-bold">{{$total}}</td>
        </tr>
    </tfoot>
</table>

