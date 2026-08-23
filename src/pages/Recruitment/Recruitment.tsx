import { useTranslation } from "react-i18next";

import { AllianceView } from "@/components/allianceView";

import { apiData } from "@/utils/stateApi";
import type { StateApiFetch } from "@/utils/types";

import transferIcon from "../../assets/icons/state_transfer.png";

export function RecruitmentPage() {
  const data: StateApiFetch | null = apiData.value;

  const { t } = useTranslation();

  return (
    <main>
      <section class="mt-24 min-h-[40vh]! items-start!">
        <h1 class="relative z-10 max-w-7xl w-full tracking-tight text-6xl md:text-8xl xl:text-[10rem] font-bold animate-fade-down">
          {t("recruitment")}
        </h1>
        <h5 class="relative z-10 max-w-7/8 px-6 mt-4 text-sm md:text-lg">
          {t("page_recruitment:recruitment_description")}
        </h5>
      </section>
      <section id="recruitment" class="max-w-full! min-h-fit!">
        <div class="bg-slate-800/50 p-2 md:p-4 pb-6 2xl:w-2/3 rounded-xl border border-slate-500/30 transition-colors shadow-sky-400/40 shadow-xl grid grid-cols-5 grid-rows-2">
          <div class="p-2 col-span-2 xl:col-span-1 row-span-1 xl:row-span-2 flex justify-center items-center">
            <img
              src={transferIcon}
              alt="transfer"
              class="max-size-30 md:max-size-40 2xl:size-40"
            />
          </div>
          <div class="col-span-3 xl:col-span-4 flex justify-center items-center">
            <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-center">
              {t("page_home:recruit_title")}
            </h1>
          </div>
          <span class="px-4 md:px-4 text-xl text-justify md:tracking-wide col-span-5 xl:col-span-4 xl:col-start-2">
            {t("page_home:recruit_content")}
            <br />
            <span class="font-extrabold tracking-wide">
              {t("page_home:recruit_contact")}
            </span>
          </span>
        </div>
      </section>
      <section>
        <div class="flex flex-col gap-8 w-full">
          {(data?.alliances ?? Array.from({ length: 5 })).map((al) => (
            <AllianceView alliance={al} />
          ))}
        </div>
      </section>
    </main>
  );
}
