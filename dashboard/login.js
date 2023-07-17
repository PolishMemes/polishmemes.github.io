// Dodaj poniższy kod do obszaru <script> w pliku login.js lub pomiń istniejący kod.

// Konfiguracja
const clientID = '848629390577500211';
const redirectURI = 'http://127.0.0.1:5500/dashboard/callback.html';
const discordAPI = 'https://discord.com/api/v10';

// Sprawdź, czy użytkownik jest już zalogowany
checkLoginStatus();

// Funkcja sprawdzająca status logowania
function checkLoginStatus() {
  const token = localStorage.getItem('accessToken');

  if (token) {
    // Wykonaj żądanie, aby pobrać dane użytkownika
    axios.get(`${discordAPI}/users/@me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // Użytkownik jest zalogowany
      const username = response.data.username;
      const discriminator = response.data.discriminator;
      const avatarUrl = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`;
      showDashboard(`${username}#${discriminator}`, avatarUrl);
    })
    .catch(error => {
      // Wystąpił błąd lub token jest nieważny
      console.error('Błąd podczas pobierania danych użytkownika:', error);
      showLogin();
    });
  } else {
    // Użytkownik nie jest zalogowany
    showLogin();
  }
}

// Funkcja wyświetlająca panel bota po zalogowaniu
function showDashboard(username, avatarUrl) {
  const loginElement = document.getElementById('login');
  const dashboardElement = document.getElementById('dashboard');
  const userAvatarElement = document.getElementById('userAvatar');

  if (loginElement && dashboardElement && userAvatarElement) {
    loginElement.style.display = 'none';
    dashboardElement.style.display = 'block';
    userAvatarElement.src = avatarUrl;
    document.getElementById('username').textContent = username;
  }
}

// Funkcja wyświetlająca formularz logowania
function showLogin() {
  const loginElement = document.getElementById('login');
  const dashboardElement = document.getElementById('dashboard');

  if (loginElement && dashboardElement) {
    loginElement.style.display = 'block';
    dashboardElement.style.display = 'none';
  }
}

// Funkcja wylogowująca użytkownika
function logout() {
  localStorage.removeItem('accessToken');
  showLogin();
}

// Funkcja odbierająca token dostępu z adresu URL
function handleAccessToken() {
  const params = new URLSearchParams(window.location.hash.substr(1));
  const accessToken = params.get('access_token');

  if (accessToken) {
    // Zapisz token dostępu w localStorage
    localStorage.setItem('accessToken', accessToken);

    // Przeładuj stronę, aby usunąć token z adresu URL
    window.location.replace(redirectURI);
  } else {
    showLogin();
  }
}

// Wywołaj funkcję handleAccessToken przy załadowaniu strony
handleAccessToken();
