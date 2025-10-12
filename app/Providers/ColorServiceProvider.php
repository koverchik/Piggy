<?php

namespace App\Providers;

use App\Services\CreateColorServices;
use Illuminate\Support\ServiceProvider;

class ColorServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('color', function () {
            return new CreateColorServices();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
