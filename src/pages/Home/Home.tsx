import { AllianceBigCard, AllianceSmallCard } from "@/components/allianceCard";

import discordLogo from "@/assets/logos/discord_big.svg";

import "@/styles/shared.css";
import "./style.css";

import { apiData } from "@/utils/stateApi";
import type { StateApiFetch } from "@/utils/types";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import transferIcon from "../../assets/icons/state_transfer.png";

export function HomePage() {
  const data: StateApiFetch | null = apiData.value;

  const { t } = useTranslation(["page_home", "common"]);

  return (
    <main>
      <section id="hero" class="h-[60vh]! mt-24 max-w-full!">
        <h1 class="relative z-10 max-w-7xl mx-auto px-6 w-full tracking-tight text-center text-7xl sm:sm:text-8xl xl:text-[10rem] font-bold animate-fade-down">
          {t("state", { state: "2263" })}
        </h1>
        <span class="text-xl xl:text-2xl z-10 mt-8 mb-2">{t("discord")}</span>
        <a
          href="https://discord.wos2263.com/"
          target="_blank"
          class="z-10 bg-slate-800/80 p-4 box-content rounded-2xl hover:bg-slate-900 border border-slate-500/30"
        >
          <img src={discordLogo} alt="discord" class="w-full h-6 xl:h-8" />
        </a>
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
              {t("recruit_title")}
            </h1>
          </div>
          <span class="px-4 md:px-4 text-xl text-justify md:tracking-wide col-span-5 xl:col-span-4 xl:col-start-2">
            {t("recruit_content")}
            <br />
            <span class="font-extrabold tracking-wide">
              {t("recruit_contact")}
            </span>
          </span>
        </div>
      </section>
      <section id="alliance-rank">
        <div class="mb-10 flex flex-col self-start">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight">
            {t("top5")}
          </h2>
          {data?.setting?.latestDataUpdate ? (
            <span class="text-gray-400 mt-2 text-xs md:text-base">
              {t("last_updated", {
                date_time: new Date(
                  data.setting.latestDataUpdate,
                ).toLocaleString(i18next.language, {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                  timeZoneName: "short",
                }),
              })}
            </span>
          ) : (
            <span class="text-gray-400 mt-2 text-xs md:text-base flex items-center gap-2">
              <span>{t("last_updated", { date_time: "" })}</span>
              <span
                aria-hidden="true"
                class="inline-block h-[1em] w-48 md:w-56 rounded bg-gray-600/60 animate-pulse"
              />
            </span>
          )}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
          <AllianceBigCard data={data?.alliances?.[0] ?? null} rank={1} />
          <div class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(data?.alliances?.slice(1, 5) ?? Array.from({ length: 4 })).map(
              (alliance, index) => (
                <AllianceSmallCard
                  key={alliance?.tag ?? `alliance-small-${index}`}
                  data={alliance ?? null}
                  rank={index + 2}
                />
              ),
            )}
          </div>
        </div>
      </section>
      <section id="svs-record">
        <div class="mb-10 flex flex-col self-start">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight">
            {t("svs_record")}
          </h2>
          <span class="text-gray-400 mt-2 text-xs md:text-base">
            {t("svs_record_description")}
          </span>
        </div>
        <div class="w-full overflow-auto">
          <table class="w-full" id="svs-table">
            <thead>
              <tr>
                <th>{t("opponent")}</th>
                <th>{t("prep_phase")}</th>
                <th>{t("battle_phase")}</th>
                <th>{t("battle_date")}</th>
                <th>{t("president")}</th>
              </tr>
            </thead>
            <tbody>
              {(data?.svSRecords ?? Array.from({ length: 10 })).map(
                (record, index) => {
                  const isLoading = !data || !record;

                  return (
                    <tr key={isLoading ? `svs-shimmer-${index}` : index}>
                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-28 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : record.opponent ? (
                          `#${record.opponent}`
                        ) : (
                          t("unknown")
                        )}
                      </td>

                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-16 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : record.prepWin !== null ? (
                          record.prepWin ? (
                            <span class="text-sky-400 font-extrabold">
                              {t("victory")}
                            </span>
                          ) : (
                            <span class="text-red-500 font-light">
                              {t("defeat")}
                            </span>
                          )
                        ) : (
                          <span class="text-green-500">{t("ongoing")}</span>
                        )}
                      </td>

                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-16 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : record.battleWin !== null ? (
                          record.battleWin ? (
                            <span class="text-sky-400 font-extrabold">
                              {t("victory")}
                            </span>
                          ) : (
                            <span class="text-red-500 font-light">
                              {t("defeat")}
                            </span>
                          )
                        ) : (
                          <span class="text-green-500">{t("ongoing")}</span>
                        )}
                      </td>

                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-32 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : (
                          record.battleDate.toLocaleDateString(
                            i18next.language,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        )}
                      </td>

                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-44 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : (
                          <>
                            {record.president !== null ? (
                              record.president
                            ) : (
                              <span class="text-green-500">
                                {t("not_appointed")}
                              </span>
                            )}
                            {record.prepWin !== null &&
                              record.battleWin !== null &&
                              record.prepWin == record.battleWin && (
                                <>
                                  <br />
                                  {record.prepWin ? (
                                    <span class="text-sky-400">
                                      {t("supreme_president")}
                                    </span>
                                  ) : (
                                    <span class="text-red-500">
                                      {t("invader")}
                                    </span>
                                  )}
                                </>
                              )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
