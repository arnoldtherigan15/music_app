1. Daftarkan aplikasi kalian di Google consolenya (http://localhost:8080)
2. ikutin dokumentasi untuk setup oauth di client
    https://developers.google.com/identity/sign-in/web/sign-in
3. tambahkan script
<script src="https://apis.google.com/js/platform.js" async defer></script>
4. tambahkan meta
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
5. pasang tombol google login
<div class="g-signin2" data-onsuccess="onSignIn"></div>
6. tambahakan function onSignIn di main.js
```javascript
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token
}
```
7. kirimkan id_token lewat body ker server (request ajax)
8. setup oauth server (node.js)
    https://developers.google.com/identity/sign-in/web/backend-auth

untuk di server
1. dari client kirim id_token (isinya id, email dll dari gugel)
2. di server kita cek email tersebut terdaftar gak di database ?
3. Jika terdaftar, tidak perlu buat user baru, langsung balikin token / access_token
3. Jika belum terdaftar, buat user baru, setelah itu baru kasih token / access_token