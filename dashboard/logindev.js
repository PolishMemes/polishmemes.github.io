// Konfiguracja
const clientID = '848629390577500211';
const redirectURI = 'http://127.0.0.1:5500/dashboard/callbackdev.html';
const discordAPI = 'https://discord.com/api/v10';

const developerDataUrl = "/data/dev_access.json";

// Sprawdź, czy użytkownik jest już zalogowany
checkLoginStatus();

// Funkcja sprawdzająca status logowania
function checkLoginStatus() {
  const token = localStorage.getItem('accessTokenDev');

  if (token) {
    // Wykonaj żądanie, aby pobrać dane użytkownika
    axios.get(`${discordAPI}/users/@me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // Użytkownik jest zalogowany
      const userId = response.data.id;
      const username = response.data.username;
      const discriminator = response.data.discriminator;
      const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${response.data.avatar}.png`;

      // Odczytaj rolę użytkownika z pliku user_data.json
      axios.get('/data/user_data.json')
        .then(userResponse => {
          const userData = userResponse.data;

          if (userData[userId]) {
            const userRole = userData[userId];

            checkDeveloperAccess(userId, username, discriminator, avatarUrl, userRole);
          } else {
            showLogin();
          }
        })
        .catch(error => {
          console.error('Błąd podczas odczytu pliku user_data.json:', error);
          showLogin();
        });
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
function showDashboard(username, avatarUrl, userRole, discriminator) {
  const loginElement = document.getElementById('login');
  const dashboardElement = document.getElementById('dashboard');
  const userAvatarElement = document.getElementById('userAvatar');
  const userRoleElement = document.getElementById('userRole');
  const discriminatorElement = document.getElementById('discriminator');

  if (loginElement && dashboardElement && userAvatarElement && userRoleElement && discriminatorElement) {
    loginElement.style.display = 'none';
    dashboardElement.style.display = 'block';
    userAvatarElement.src = avatarUrl;
    document.getElementById('username').textContent = username;
    userRoleElement.textContent = userRole;
    discriminatorElement.textContent = discriminator;
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
  localStorage.removeItem('accessTokenDev');
  showLogin();
}

// Funkcja odbierająca token dostępu z adresu URL
function handleAccessToken() {
  const params = new URLSearchParams(window.location.hash.substr(1));
  const accessToken = params.get('access_token');

  if (accessToken) {
    // Zapisz token dostępu w localStorage
    localStorage.setItem('accessTokenDev', accessToken);

    // Przeładuj stronę, aby usunąć token z adresu URL
    window.location.replace(redirectURI);
  } else {
    showLogin();
  }
}

// Funkcja sprawdzająca dostęp do panelu deweloperskiego
function checkDeveloperAccess(userId, username, discriminator, avatarUrl, userRole) {
  axios.get(developerDataUrl)
    .then(response => {
      const allowedUsers = response.data.allowedUsers;

      if (allowedUsers.includes(userId)) {
        // Użytkownik ma dostęp do panelu deweloperskiego
        showDashboard(username, avatarUrl, userRole, discriminator);
      } else {
        // Użytkownik nie ma dostępu do panelu deweloperskiego
        logout();
      }
    })
    .catch(error => {
      console.error("Error retrieving developer data:", error);
      logout();
    });
}

// Wywołaj funkcję handleAccessToken przy załadowaniu strony
handleAccessToken();
