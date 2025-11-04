<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ChangePermission extends Mailable
{
    use Queueable, SerializesModels;

    public User $host;
    public User $user;
    public string $name;
    public string $level;
    public string $link;

    /**
     * Create a new message instance.
     */
    public function __construct(User $host, User $user, string $name, string $level, string $link)
    {
        $this->host = $host;
        $this->user = $user;
        $this->name = $name;
        $this->level = $level;
        $this->link = $link;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Access to the table '{$this->name}' has been changed to '{$this->level}'.",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.user.change_permission',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
