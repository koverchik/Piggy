<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ColorFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'color';
    }
}
