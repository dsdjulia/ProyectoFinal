<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactoProveedorMail extends Mailable
{
    use Queueable, SerializesModels;


    public $subject;
    public $messageBody;
    public $sender;

    // Recibe asunto y mensaje en el constructor
    public function __construct($subject, $messageBody,$sender)
    {
        $this->subject = $subject;
        $this->messageBody = $messageBody;
        $this->sender = $sender;
    }

    public function build()
    {
        return $this->subject($this->subject)
                    ->view('emails')
                    ->with([
                        'messageBody' => $this->messageBody,
                        'sender' => $this->sender, // pasa a la vista también
                    ]);
    }


}
