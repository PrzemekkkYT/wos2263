import { useTranslation } from "react-i18next";

import { getGloryIcons } from "@/utils/alliance";
import type { Alliance } from "@/utils/types";

import blankUser from "@/assets/avatars/blank.svg";
import discordLogo from "@/assets/logos/discord.svg";

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

  const unfilteredEvents = alliance.recruitment?.eventTimes;
  if (!unfilteredEvents) return null;

  const eventItems: Array<[label: string, time?: string | null]> = [
    [t("page_recruitment:bear_trap"), unfilteredEvents.bearTrap],
    [t("page_recruitment:foundry"), unfilteredEvents.foundry],
    [t("page_recruitment:canyon"), unfilteredEvents.canyon],
    [t("page_recruitment:crazy_joe"), unfilteredEvents.crazyJoe],
    [t("page_recruitment:mercenary_bosses"), unfilteredEvents.mercenaryBosses],
  ];

  const events = eventItems.filter(([, time]) => Boolean(time));

  return (
    <div class="flex flex-col bg-slate-800 px-2 py-6 xl:p-6 rounded-lg">
      <div class="mb-6">
        <div class="flex items-center gap-6 bg-slate-900/40 rounded p-2">
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
              <div>
                {alliance.glory && (
                  <div
                    class="flex items-center gap-2"
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
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 xl:gap-6">
        <div class="p-4 bg-slate-900/40 rounded">
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
        <div class="p-4 bg-slate-900/40 rounded">
          <div class="mb-6 flex flex-row gap-5 items-center">
            <h3 class="text-sky-500 font-bold tracking-widest">
              {t("page_recruitment:event_timings")}
            </h3>
            <button
              class="p-1 text-white hover:text-gray-300 active:text-gray-500 "
              title="Click to copy timings to the clipboard"
              onClick={() => {
                const eventText = events
                  .map(([label, time]) => `${label}: ${time}`)
                  .join("\n");
                console.log(eventText);
                navigator.clipboard.writeText(
                  `${alliance.tag} - ${t("page_recruitment:event_timings")}:\n\n${eventText}\n\n${t("page_recruitment:get_more_info", { website: "https://wos2263.com/recruitment" })}`,
                );
              }}
            >
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                  fill="currentColor"
                />
                <path
                  d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-y-4 gap-x-6">
            {(() => {
              return events.map(([label, time]) => (
                <div key={label} class="flex flex-col bg-black/20 p-2 rounded">
                  <span class="uppercase tracking-tighter text-gray-400">
                    {label}
                  </span>
                  <span>{time}</span>
                </div>
              ));
            })()}
          </div>
        </div>
        <div class="p-4 bg-slate-900/40 rounded">
          <h3 class="mb-6 text-sky-500 font-bold tracking-widest">
            {t("page_recruitment:contact")}
          </h3>
          <div class="flex flex-wrap gap-8 items-center">
            {alliance.recruitment?.recruiters?.map((recruiter) => (
              <div class="flex flex-row gap-3 max-w-1/2 min-w-2/5">
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
      </div>
    </div>
  );
}
