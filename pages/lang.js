const languageSelect = document.getElementById('languageSelect');
const translationData = {}; // Tutaj zostaną wczytane tłumaczenia z pliku JSON

// Funkcja do wczytania tłumaczeń z pliku JSON na podstawie wybranego języka
async function loadTranslations(language) {
    try {
        const response = await fetch('/data/translations.json'); // Ścieżka do pliku JSON
        const translationData = await response.json();
        return translationData[language] || {};
    } catch (error) {
        console.error('Błąd podczas wczytywania tłumaczeń:', error);
        return {};
    }
}

// Funkcja do aktualizacji tłumaczeń na stronie
async function updateTranslations(language) {
    const translations = await loadTranslations(language);
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const translationKey = element.getAttribute('data-translate');
        const translation = translations[translationKey] || translationKey;

        // Aktualizuj zawartość elementu w zależności od wybranego języka
        element.textContent = translation;
    });

    // Zapisz wybrany język do localStorage
    localStorage.setItem('selectedLanguage', language);
}

// Sprawdź, czy w localStorage jest zapisany wybrany język
const storedLanguage = localStorage.getItem('selectedLanguage');
const defaultLanguage = storedLanguage || languageSelect.value;

// Ustaw wybrany język na elemencie select
languageSelect.value = defaultLanguage;

// Domyślnie załaduj tłumaczenia w zależności od wybranego języka
updateTranslations(defaultLanguage);

// Obsługa zmiany języka
languageSelect.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    updateTranslations(selectedLanguage);
});
