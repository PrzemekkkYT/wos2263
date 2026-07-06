import { getGloryIcons } from "@/utils/alliance";
import type { Alliance } from "@/utils/types";

import blankUser from "@/assets/avatars/blank.svg";
import discordLogo from "@/assets/logos/discord.svg";
import { useTranslation } from "react-i18next";

const socialMediaLogos = new Map<string, string>([["discord", discordLogo]]);

function AllianceViewShimmer() {
  return (
    <div class="flex flex-col bg-slate-800 px-2 py-6 xl:p-10 rounded-lg">
      <div class="mb-10 animate-pulse">
        <div class="flex items-center gap-6">
          <div class="size-32 rounded bg-slate-700/60" />
          <div class="flex-1">
            <div class="h-8 w-72 max-w-full rounded bg-slate-700/60 mb-2" />
            <div class="flex flex-row items-center justify-between gap-10 max-w-1/2 lg:max-w-1/3">
              <div class="h-6 w-40 rounded bg-slate-700/60" />
              <div class="h-6 w-32 rounded bg-slate-700/60" />
            </div>
            <div class="flex items-center gap-2 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} class="size-6 rounded bg-slate-700/60" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 mb-10 xl:gap-40 animate-pulse">
        <div class="p-4">
          <div class="h-5 w-40 rounded bg-slate-700/60 mb-6" />
          <ul class="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} class="flex items-center justify-between text-sm">
                <div class="h-4 w-36 rounded bg-slate-700/60" />
                <div class="h-4 w-16 rounded bg-slate-700/60" />
              </li>
            ))}
          </ul>
        </div>

        <div class="p-4 animate-pulse">
          <div class="h-5 w-56 rounded bg-slate-700/60 mb-6" />
          <div class="grid grid-cols-2 gap-y-4 gap-x-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} class="flex flex-col gap-2">
                <div class="h-3 w-20 rounded bg-slate-700/60" />
                <div class="h-4 w-24 rounded bg-slate-700/60" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="pt-2 pl-4 border-t border-slate-400/10 flex flex-col">
        <div class="h-5 w-24 rounded bg-slate-700/60 my-4" />
        <div class="flex flex-wrap gap-12 items-start pb-2 animate-pulse">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} class="flex flex-row gap-3 items-start">
              <div class="size-14 rounded-lg bg-slate-700/60" />
              <div class="flex flex-col gap-2">
                <div class="h-4 w-28 rounded bg-slate-700/60" />
                <div class="flex flex-row gap-2">
                  {Array.from({ length: 2 }).map((__, j) => (
                    <div key={j} class="size-8 rounded bg-slate-700/60" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AllianceView({ alliance }: { alliance: Alliance | null }) {
  if (!alliance) return <AllianceViewShimmer />;

  const { t } = useTranslation();

  return (
    <div class="flex flex-col bg-slate-800 px-2 py-6 xl:p-10 rounded-lg">
      <div class="mb-10">
        <div class="flex items-center gap-6">
          <img src={alliance.banner} class="size-32" />
          <div>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-1">
              [{alliance.tag}] {alliance.name}
            </h2>
            <div class="flex flex-row items-center justify-between min gap-10">
              <h3 class="md:text-xl font-bold text-sky-400">
                {t("power", { power: alliance.power })}
              </h3>
              <h4 class="text-gray-400 md:text-xl">
                {t("players", { players: alliance.playerCount })}
              </h4>
            </div>
            {alliance.glory && (
              <div
                class="flex items-center gap-2 mt-2"
                title={t("page_home:glory_path", { count: alliance.glory })}
              >
                {getGloryIcons(alliance.glory).map((iconPath, index) => (
                  <img
                    key={index}
                    src={iconPath}
                    alt="Glory Icon"
                    class="size-6"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 mb-10 xl:gap-40">
        <div class="p-4 max-w-1/2">
          <h3 class="mb-6 text-sky-500 font-bold tracking-widest">
            {t("page_recruitment:requirements")}
          </h3>
          <ul class="space-y-4">
            {Array.from(alliance.recruitment?.requirements ?? []).map(
              ({ requirement, value }) => (
                <li
                  key={requirement}
                  class="flex items-center justify-between text-sm bg-black/20 p-2 rounded"
                >
                  <span class="text-gray-300">
                    {t(`page_recruitment:${requirement}`)}
                  </span>
                  <span>{value}</span>
                </li>
              ),
            )}
          </ul>
        </div>
        <div class="p-4">
          <h3 class="mb-6 text-sky-500 font-bold tracking-widest">
            {t("page_recruitment:event_timings")}
          </h3>
          <div class="grid grid-cols-2 gap-y-4 gap-x-6">
            {(() => {
              const events = alliance.recruitment?.eventTimes;
              if (!events) return null;

              const items: Array<[label: string, time?: string | null]> = [
                [t("page_recruitment:bear_trap"), events.bearTrap],
                [t("page_recruitment:foundry"), events.foundry],
                [t("page_recruitment:canyon"), events.canyon],
                [t("page_recruitment:crazy_joe"), events.crazyJoe],
                [
                  t("page_recruitment:mercenary_bosses"),
                  events.mercenaryBosses,
                ],
              ];

              return items
                .filter(([, time]) => Boolean(time))
                .map(([label, time]) => (
                  <div
                    key={label}
                    class="flex flex-col bg-black/20 p-2 rounded"
                  >
                    <span class="uppercase tracking-tighter text-gray-400">
                      {label}
                    </span>
                    <span>{time}</span>
                  </div>
                ));
            })()}
          </div>
        </div>
      </div>
      <div class="pt-2 pl-4 border-t border-slate-400/10 flex flex-col">
        {alliance.recruitment?.recruiters && (
          <>
            <span class="py-4 text-sky-500 font-bold tracking-widest">
              {t("page_recruitment:contact")}
            </span>
            <div class="flex flex-wrap gap-8 items-center">
              <div class="flex flex-wrap gap-12 items-start">
                {alliance.recruitment?.recruiters?.map((recruiter) => (
                  <div class="flex flex-row gap-3">
                    <img
                      src={recruiter.image ? recruiter.image : blankUser}
                      alt=""
                      class="size-14 rounded-lg object-cover bg-gray-900"
                    />
                    <div class="flex flex-col">
                      <h3 class="font-bold">{recruiter.name}</h3>
                      <div class="flex flex-row gap-2">
                        {recruiter.position && (
                          <div class="flex flex-col text-xs text-gray-400">
                            <span>X: {recruiter.position.x}</span>
                            <span>Y: {recruiter.position.y}</span>
                          </div>
                        )}
                        {recruiter.contact &&
                          recruiter.contact.map(({ socialMedia, url }) => (
                            <a href={url} target="_blank">
                              <img
                                src={socialMediaLogos.get(socialMedia) ?? ""}
                                alt=""
                                class="size-8"
                              />
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* eventuall more info button */}
          </>
        )}
      </div>
    </div>
  );
}
