<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'alpha_dash'],
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
            'password-confirm' => ['required', 'min:8', 'confirmed']
        ];
    }
    public function messages(): array
    {
        return [
            'email.email' => 'Email is invalid. Please try again use schema: username@domain.com',
        ];
    }
}
