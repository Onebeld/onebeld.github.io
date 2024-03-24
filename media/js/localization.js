const DEFAULT_LOCALE = "en";

const LOCALES = [
    "en",
    "ru"
];

const browserLocale = navigator.language.split("-")[0];

let locale;

let translations = {};

function setLocale(newLocale) {
    locale = LOCALES.includes(newLocale) ? newLocale : DEFAULT_LOCALE;

    document.documentElement.lang = locale;
}

async function fetchTranslations(locale) {
    const response = await fetch(`media/lang/${locale}.json`);
    return await response.json();
}

function translatePage() {
    document.querySelectorAll("[data-translate-key]").forEach(translateElement);
}

function translateElement(element) {
    const key = element.getAttribute("data-translate-key");
    element.innerText = translations[key];
}

function translateString(string) {
    // From {{key}} to text from translations with Regex
    return string.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        // Если ключ найден в translations, возвращаем соответствующий перевод
        return translations[key.trim()] || match;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    translations = await fetchTranslations(locale);
    translatePage();
});

setLocale(browserLocale);