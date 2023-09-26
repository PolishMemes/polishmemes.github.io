// Dodaj poniższy kod do obszaru <script> w pliku loginButton.js.

// Funkcja do logowania za pomocą Discorda
function loginWithDiscord() {
    const clientID = '848629390577500211';
    const redirectURI = 'http://127.0.0.1:5500/dashboard/callback';
    const discordAPI = 'https://discord.com/api/v10';
  
    window.location.href = `${discordAPI}/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=token&scope=identify`;
  }

