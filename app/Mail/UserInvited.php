<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserInvited extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;

    public User $host;

    public string $type;
    public string $name;
    public string $level;
    public string $acceptUrl;

    public function __construct(User $user, User $host, string $type, string $name, string $level, string $acceptUrl)
    {
        $this->user = $user;
        $this->host = $host;
        $this->type = $type;
        $this->name = $name;
        $this->level = $level;
        $this->acceptUrl = $acceptUrl;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "You’re invited to join {$this->type} for collect info and split the {$this->type}!",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.user.invited',
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
