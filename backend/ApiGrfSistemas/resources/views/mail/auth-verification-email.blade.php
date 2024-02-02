@component('mail::message')
Olá, {{$data['name']}}

<span> Para concluir a criação da sua conta, é necessário confirmar este email. Clique no botão ou acesse o link <br /> <span style="color: rgb(58, 58, 255);font-size:15px">{{ env('APP_URL_FRONT').'/auth/email/verification/'.$data["token"]}} </span>


@component('mail::button', ['url' => env('APP_URL_FRONT').'/auth/email/verification/'.$data["token"]])
Verificar Email
@endcomponent


Atenciosamente,<br>
equipe {{ config('app.name') }}
@endcomponent
