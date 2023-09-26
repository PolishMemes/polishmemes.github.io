// Odczytaj wartość 'redirectFrom' z localStorage
const redirectFrom = localStorage.getItem('redirectFrom');

// Domyślny adres przekierowania
const defaultRedirect = 'http://127.0.0.1:5500/dashboard/index';

// Przekieruj użytkownika na ostatnią odwiedzaną stronę przed zalogowaniem lub na domyślną stronę
if (redirectFrom) {
   setTimeout(function() {
      window.location.href = redirectFrom;
   }, 3000);
} else {
   setTimeout(function() {
      window.location.href = defaultRedirect;
   }, 3000);
}
