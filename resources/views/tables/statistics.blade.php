<div class="progress">
    @foreach($calculation as $item)
        <div class="progress-bar" role="progressbar"
             style="width: {{ 100 * $item['total_amount'] / $total }}%; background-color: {{$item['user']->color}};"
             aria-valuenow="{{$item['total_amount']}}" aria-valuemin="0"
             aria-valuemax="{{$total}}">
            {{$item['total_amount']}}
        </div>
    @endforeach
</div>
<div class="text-center small mt-1">
    {{ $total }}
</div>
<div class="mt-4">
    @foreach($calculation as $item)
        <div class="d-flex align-items-center ">
            @include('members.user-picture', ['user' => $item['user']])
            <div class="flex-grow-1 ms-2 p-1">
                <div class="progress">
                    <div class="progress-bar"
                         role="progressbar"
                         style="width: {{ 100 * $item['total_amount'] / $total }}%; background-color: {{$item['user']->color}};"
                         aria-valuenow="{{$item['total_amount'] }}"
                         aria-valuemin="0"
                         aria-valuemax="{{$total}}">
                    </div>
                </div>
                <div class="text-center small mt-1">
                    {{ round(100 * $item['total_amount'] / $total, 2) }} %
                </div>
            </div>
        </div>
    @endforeach
</div>
<div style="height: 72px"></div>

