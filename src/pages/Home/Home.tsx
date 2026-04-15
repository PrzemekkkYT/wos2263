import { AllianceBigCard, AllianceSmallCard } from "@/components/allianceCard";
import { alliances } from "@/data/alliances";
import { svsRecords } from "@/data/svs";

import discordLogo from "@/assets/logos/discord_big.svg";

import "@/styles/shared.css";
import "./style.css";

export function HomePage() {
  const sortedAl = [...alliances].sort((a, b) => b.power - a.power);
  const leader = sortedAl[0];
  const topRemaining = sortedAl.slice(1, 5);

  const sortedSvS = [...svsRecords].sort(
    (a, b) => b.battleDate.getTime() - a.battleDate.getTime(),
  );

  return (
    <main>
      <section id="hero" class="h-[60vh]! mt-24 max-w-full!">
        <h1 class="relative z-10 max-w-7xl mx-auto px-6 w-full tracking-tight text-center text-8xl xl:text-[10rem] font-bold animate-fade-down">
          State 2263
        </h1>
        <span class="text-xl xl:text-2xl z-10 mt-8 mb-2">Join our Discord</span>
        <a
          href="https://discord.gg/SYSj4pjY9P"
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
          <span class="text-gray-400 mt-2 text-xs md:text-base">
            Last Updated: Apr 15, 2026, 22:00 UTC
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
          <AllianceBigCard data={leader} rank={1} />
          <div class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topRemaining.map((alliance, index) => (
              <AllianceSmallCard
                key={alliance.tag}
                data={alliance}
                rank={index + 2}
              />
            ))}
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
                <th>Battle Date</th>
                <th>Prep Phase</th>
                <th>Battle Phase</th>
                <th>President</th>
              </tr>
            </thead>
            <tbody>
              {sortedSvS.map((record) => (
                <tr>
                  <td>
                    {record.battleDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {record.prepWin ? (
                      <span class="text-sky-400 font-extrabold">Win</span>
                    ) : (
                      <span class="text-red-500 font-light">Lose</span>
                    )}
                  </td>
                  <td>
                    {record.battleWin ? (
                      <span class="text-sky-400 font-extrabold">Win</span>
                    ) : (
                      <span class="text-red-500 font-light">Lose</span>
                    )}
                  </td>
                  <td>
                    {record.president}
                    {record.supreme !== undefined && (
                      <>
                        <br />
                        {record.supreme ? (
                          <span class="text-sky-400">Supreme President</span>
                        ) : (
                          <span class="text-red-500">Invader</span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
