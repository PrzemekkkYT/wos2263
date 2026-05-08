import { AllianceBigCard, AllianceSmallCard } from "@/components/allianceCard";
// import { alliances } from "@/data/alliances";

import discordLogo from "@/assets/logos/discord_big.svg";

import "@/styles/shared.css";
import "./style.css";

import { apiData } from "@/utils/stateApi";
import type { StateApiFetch } from "@/utils/types";

export function HomePage() {
  const data: StateApiFetch | null = apiData.value;

  return (
    <main>
      <section id="hero" class="h-[60vh]! mt-24 max-w-full!">
        <h1 class="relative z-10 max-w-7xl mx-auto px-6 w-full tracking-tight text-center text-8xl xl:text-[10rem] font-bold animate-fade-down">
          State 2263
        </h1>
        <span class="text-xl xl:text-2xl z-10 mt-8 mb-2">Join our Discord</span>
        <a
          href="https://discord.wos2263.com/"
          target="_blank"
          class="z-10 bg-slate-800/80 p-4 box-content rounded-2xl hover:bg-slate-900 border border-slate-500/30"
        >
          <img src={discordLogo} alt="discord" class="w-full h-6 xl:h-8" />
        </a>
      </section>
      <section id="alliance-rank">
        <div class="mb-10 flex flex-col self-start">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight">
            Top 5 alliances
          </h2>
          {data?.setting?.latestDataUpdate ? (
            <span class="text-gray-400 mt-2 text-xs md:text-base">
              {"Last Updated: " +
                new Date(data.setting.latestDataUpdate).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "UTC",
                    timeZoneName: "short",
                  },
                )}
            </span>
          ) : (
            <span class="text-gray-400 mt-2 text-xs md:text-base flex items-center gap-2">
              <span>Last Updated:</span>
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
            SvS Record
          </h2>
          <span class="text-gray-400 mt-2 text-xs md:text-base">
            Historical data from previous battle cycles.
          </span>
        </div>
        <div class="w-full overflow-auto">
          <table class="w-full" id="svs-table">
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Prep Phase</th>
                <th>Battle Phase</th>
                <th>Battle Date</th>
                <th>President</th>
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
                          "Unknown"
                        )}
                      </td>

                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-16 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : record.prepWin !== undefined ? (
                          record.prepWin ? (
                            <span class="text-sky-400 font-extrabold">
                              Victory
                            </span>
                          ) : (
                            <span class="text-red-500 font-light">Defeat</span>
                          )
                        ) : (
                          <span class="text-green-500">Ongoing</span>
                        )}
                      </td>

                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-16 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : record.battleWin !== undefined ? (
                          record.battleWin ? (
                            <span class="text-sky-400 font-extrabold">
                              Victory
                            </span>
                          ) : (
                            <span class="text-red-500 font-light">Defeat</span>
                          )
                        ) : (
                          <span class="text-green-500">Ongoing</span>
                        )}
                      </td>

                      <td>
                        {isLoading ? (
                          <span
                            aria-hidden="true"
                            class="inline-block h-[1em] w-32 rounded bg-gray-600/60 animate-pulse"
                          />
                        ) : (
                          record.battleDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
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
                            {record.president !== undefined ? (
                              record.president
                            ) : (
                              <span class="text-green-500">
                                Not yet appointed
                              </span>
                            )}
                            {record.prepWin !== undefined &&
                              record.battleWin !== undefined &&
                              record.prepWin == record.battleWin && (
                                <>
                                  <br />
                                  {record.prepWin ? (
                                    <span class="text-sky-400">
                                      Supreme President
                                    </span>
                                  ) : (
                                    <span class="text-red-500">Invader</span>
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
