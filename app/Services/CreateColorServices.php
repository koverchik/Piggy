<?php

namespace App\Services;

class CreateColorServices
{
    public function getRandomColor(): string
    {
        $r = rand(0, 220);
        $g = rand(0, 220);
        $b = rand(0, 220);

        return sprintf("#%02x%02x%02x", $r, $g, $b);
    }
}
