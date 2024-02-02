<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AuthVerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
    */

    public $data;

    public function __construct(Array $data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('grfsistemas@gmail.com')
                    ->subject(env('APP_NAME').' - Confirmação da conta, '.$this->data['name'])
                    ->markdown('mail.auth-verification-email', [
                        'data' => $this->data
                    ]);
    }
}
