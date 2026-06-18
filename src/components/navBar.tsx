import { Link, useRoute } from "wouter";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "preact/hooks";
import { rtlLanguages } from "@/utils/i18n";
import { apiData } from "@/utils/stateApi";
import type { StateApiFetch } from "@/utils/types";

function ActiveLink(props: {
  href: string;
  children: any;
  onClick?: () => void;
  class?: string;
}) {
  const [isActive] = useRoute(props.href);

  return (
    <Link
      {...props}
      class={`ref-button ${isActive ? "selected" : ""} ${props.class || ""}`}
    >
      {props.children}
    </Link>
  );
}

export function NavBar() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const data: StateApiFetch | null = apiData.value;

  // const currentLang =
  //   supportedLanguages[i18n.language] || supportedLanguages.en;

  const supportedLanguages = data?.setting.languages ?? {};

  const currentLang = supportedLanguages[i18n.language] || {
    en: { nativeName: "English", flag: "🇺🇸", enabled: true },
  };

  // Zamykanie menu po kliknięciu poza nawigację
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    const currentLangIsRtl = rtlLanguages.includes(i18n.language);
    const newLangIsRtl = rtlLanguages.includes(code);

    i18n.changeLanguage(code).then(() => {
      if (
        currentLangIsRtl !== newLangIsRtl &&
        window.location.pathname.includes("calendar")
      ) {
        window.location.reload();
      } else {
        // If direction is the same, no need for a full reload.
        // Close menus and let react-i18next re-render components.
        setIsLangMenuOpen(false);
        setIsMobileMenuOpen(false);
        document.body.setAttribute(
          "dir",
          rtlLanguages.includes(code) ? "rtl" : "ltr",
        );
      }
    });
  };

  return (
    <nav ref={navRef}>
      {/* MOBILE NAV */}
      <div class="fixed top-0 w-full z-50 flex justify-end items-center px-4 py-4 md:hidden">
        <div class="relative inline-block text-left">
          <button
            class="bg-slate-800 border border-slate-700 rounded-lg p-1 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg class="w-10 h-10" viewBox="0 0 16 16" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div class="absolute right-0 top-full flex flex-row gap-2 mt-2">
              {/* Mobile Language List */}
              {isLangMenuOpen && (
                <div class="w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
                  <div class="py-1">
                    {Object.entries(supportedLanguages).map(
                      ([code, { nativeName, flag, enabled }]) => (
                        <button
                          key={code}
                          class="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-sm text-white transition-colors; w-full text-left"
                          onClick={() => changeLanguage(code)}
                          disabled={!enabled}
                        >
                          <span>{flag}</span> {nativeName}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Main Links */}
              <div class="w-40 max-h-42 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
                <div class="py-1 flex flex-col">
                  <ActiveLink
                    href="/"
                    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-sm text-white transition-colors;"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("home")}
                  </ActiveLink>
                  <ActiveLink
                    href="/recruitment"
                    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-sm text-white transition-colors;"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("recruitment")}
                  </ActiveLink>
                  <ActiveLink
                    href="/calendar"
                    class=""
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("calendar")}
                  </ActiveLink>
                  <div
                    class="language-select-button w-full px-4 py-3 hover:bg-slate-800 text-sm text-white transition-colors; flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  >
                    <svg
                      class={`w-4 h-4 text-gray-400 transition-transform ${isLangMenuOpen ? "rotate-180" : "rotate-90"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span>{currentLang.flag}</span>
                    <span>{currentLang.nativeName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div class="fixed top-0 w-full z-50 bg-slate-950/50 hidden md:grid grid-cols-3 items-center px-8 py-4">
        <div class="col-start-2 flex flex-row items-center justify-center gap-4">
          <ActiveLink href="/">{t("home")}</ActiveLink>
          <ActiveLink href="/recruitment">{t("recruitment")}</ActiveLink>
          <ActiveLink href="/calendar">{t("calendar")}</ActiveLink>
        </div>

        <div class="flex justify-end items-center">
          <div class="relative inline-block text-left">
            <button
              type="button"
              class="language-select-button flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white hover:bg-slate-700 transition-colors"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <span>{currentLang.flag}</span>
              <span class="selectedLabel">{currentLang.nativeName}</span>
              <svg
                class={`w-4 h-4 text-gray-400 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div class="absolute inset-e-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-100 overflow-hidden backdrop-blur-md">
                <div class="py-1 grid grid-cols-2">
                  {Object.entries(supportedLanguages).map(
                    ([code, { nativeName, flag, enabled }]) => (
                      <button
                        key={code}
                        class={`flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-sm text-white transition-colors; w-full text-left ${!enabled ? "text-gray-400 hover:bg-gray-950/20! bg-gray-950/20 line-through cursor-not-allowed" : ""}`}
                        onClick={() => changeLanguage(code)}
                        disabled={!enabled}
                      >
                        <span>{flag}</span> {nativeName}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
