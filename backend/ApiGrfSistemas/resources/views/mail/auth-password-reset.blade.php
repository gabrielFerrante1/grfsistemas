@component('mail::message')
# Redefinição da senha

Acesse o link para prosseguir com a redefinição de sua senha. Clique no botão ou acesse o link <br> <span style="color: rgb(58, 58, 255);font-size:15px">{{ env('APP_URL_FRONT').'/auth/password/reset/'.$data['token']}} </span> 

@component('mail::button', ['url' => env('APP_URL_FRONT').'/auth/password/reset/'.$data['token']])
Redefinir minha senha
@endcomponent

Atenciosamente, <br>
equipe {{ config('app.name') }}
@endcomponent
