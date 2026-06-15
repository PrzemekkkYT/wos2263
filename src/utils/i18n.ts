import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const rtlLanguages = ["ar", "he", "fa", "ur"];

export const supportedLanguages: Record<
  string,
  { name: string; flag: string }
> = {
  ach: { name: "Translate", flag: "🌐" },
  en: { name: "English", flag: "🇺🇸" },
  pl: { name: "Polski", flag: "🇵🇱" },
  ar: { name: "العربية", flag: "🇸🇦" },
  ko: { name: "한국어", flag: "🇰🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  fr: { name: "Français", flag: "🇫🇷" },
  es: { name: "Español", flag: "🇪🇸" },
  it: { name: "Italiano", flag: "🇮🇹" },
  ru: { name: "Русский", flag: "🇷🇺" },
};

const jsonFiles = import.meta.glob("../locales/**/*.json", { eager: true });

const resources: Record<string, any> = {};

// Mapujemy strukturę plików z Vite na format zrozumiały dla i18next
Object.entries(jsonFiles).forEach(([path, file]: [string, any]) => {
  const parts = path.split("/");
  const lng = parts[parts.length - 2];
  const ns = parts[parts.length - 1].replace(".json", "");

  if (!resources[lng]) {
    resources[lng] = {};
  }

  resources[lng][ns] = file.default || file;
});

// 1. Sprawdzamy, czy jesteśmy w trybie edycji tekstów Crowdin
// Możesz to aktywować np. dodając `?translate=true` do adresu URL strony
const isInContextMode =
  typeof window !== "undefined" &&
  window.location.search.includes("translate=true");

// 2. Jeśli jesteśmy w trybie Crowdin, sztucznie tworzymy pustą strukturę dla języka 'ach'
// Dzięki temu i18next nie znajdzie gotowych tłumaczeń i uruchomi funkcję parseMissingKeyHandler
if (isInContextMode && !resources["ach"]) {
  resources["ach"] = {};
  // Tworzymy puste obiekty dla każdego namespace, żeby i18next wiedział, że te namespace istnieją
  const namespaces = [
    "common",
    "errors",
    "page_home",
    "page_calendar",
    "page_recruitment",
  ];
  namespaces.forEach((ns) => {
    resources["ach"][ns] = {};
  });
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next) // Łączy i18next z react-i18next
  .init({
    resources: resources,
    // 3. Dynamicznie ustawiamy język: 'ach' dla edytora Crowdin, w innym wypadku wykrywanie automatyczne
    lng: isInContextMode ? "ach" : undefined,
    fallbackLng: "en",
    supportedLngs: Object.keys(resources),
    ns: ["common", "errors", "page_home", "page_calendar", "page_recruitment"],

    // 4. KLUCZOWE DLA CROWDIN: Mapowanie brakujących kluczy na pseudo-tokeny edytora
    parseMissingKeyHandler: (key) => {
      if (isInContextMode) {
        // Zwraca klucz w formacie, który skrypt Crowdin potrafi przechwycić w DOM-ie
        return `%${key}%`;
      }
      return key;
    },

    // Zapobiega ucinaniu kropek czy specyficznych znaków w trybie parsowania
    appendNamespaceToMissingKey: true,
    interpolation: {
      escapeValue: false,
    },
  });

if (i18next.services && i18next.services.formatter) {
  // 1. Format dla daty (UTC)
  i18next.services.formatter.add(
    "myCustomDate",
    (value: unknown, lng: string | undefined) => {
      // Jeśli wartość to timestamp (number) lub string z datą, konwertujemy na Date
      const dateValue = value instanceof Date ? value : new Date(value as any);

      // Zabezpieczenie przed Invalid Date
      if (isNaN(dateValue.getTime())) return String(value);

      return new Intl.DateTimeFormat(lng || "pl", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
        timeZoneName: "short",
      }).format(dateValue);
    },
  );

  // 2. Format dla dużych liczb (np. 17M, 2B)
  i18next.services.formatter.add(
    "compact",
    (value: number, lng: string | undefined) => {
      const numValue = typeof value === "number" ? value : Number(value);

      // Zabezpieczenie przed NaN
      if (isNaN(numValue)) return String(value);

      return new Intl.NumberFormat(lng || "pl", {
        notation: "compact",
        compactDisplay: "short",
      }).format(numValue);
    },
  );
}

export default i18next;
