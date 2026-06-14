import { useTranslation } from "react-i18next";

import googlePlay from "@/assets/logos/googleplay.svg";
import appStore from "@/assets/logos/appstore.svg";

import { apiData } from "@/utils/stateApi";

export function Footer() {
  const data = apiData.value;

  const { t } = useTranslation();

  return (
    <footer class="bg-slate-900 text-center">
      <div class="bg-slate-950/50 size-full px-12 py-4 flex flex-col md:flex-row justify-between items-center">
        <div class="text-center">
          <span class="md:text-2xl z-50 mt-8">{t("get_whiteout")}</span>
          <div class="flex flex-row gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.gof.global"
              class="z-10"
              target="_blank"
            >
              <img
                src={googlePlay}
                alt="play whiteout survival"
                class="h-8 p-2 md:h-12 md:p-3 box-content"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/whiteout-survival/id6443575749"
              class="z-10"
              target="_blank"
            >
              <img
                src={appStore}
                alt="play whiteout survival"
                class="h-8 p-2 md:h-12 md:p-3 box-content"
              />
            </a>
          </div>
        </div>
        <span class="mt-4 text-xs md:text-base text-gray-400">
          {t("not_affiliated")}
        </span>
        <span class="mt-4 text-xs md:text-base text-gray-400">
          © {new Date().getFullYear()}{" "}
          {data?.setting.authorName ?? "[ONE]Przemekkk"}
          <br />
          {t("version", { version: data?.setting.version ?? -1 })}
        </span>
      </div>
    </footer>
  );
}
