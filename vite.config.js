import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/app.scss', 'resources/scss/colors.scss',  'resources/scss/email.scss', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
});
