import "./style.css";
import "@/styles/shared.css";
import { AllianceBigCard, AllianceSmallCard } from "@/components/allianceCard";
import type { Alliance, SvSRecord } from "@/utils/types";

import discordLogo from "@/assets/logos/discord.svg";

const alliances: Alliance[] = [
  {
    tag: "DOL",
    name: "우린우스에돌았어",
    power: 34.2e9,
    glory: 7,
  },
  {
    tag: "ONE",
    name: "Great⬩Empire",
    power: 30.6e9,
  },
  {
    tag: "HOW",
    name: "House⬩Of⬩Wolves",
    power: 27.8e9,
  },
  {
    tag: "Toy",
    name: "뚜비",
    power: 18.7e9,
  },
  {
    tag: "PRO",
    name: "TheProtectors",
    power: 12.1e9,
  },
];

const svsRecords: SvSRecord[] = [
  {
    battleDate: new Date("2026-03-28"),
    prepWin: true,
    battleWin: false,
    president: "[ONE]༒༒ᴼᴺᴱAJAᴼᴺᴱ༒༒",
  },
  {
    battleDate: new Date("2026-02-28"),
    prepWin: false,
    battleWin: true,
    president: "[DOL]돌모찌ᴰᴼᴸ",
  },
  {
    battleDate: new Date("2026-01-31"),
    prepWin: false,
    battleWin: true,
    president: "[DOL]এPokerFace｡·͜·｡",
  },
  {
    battleDate: new Date("2026-01-03"),
    prepWin: false,
    battleWin: true,
    president: "[DOL]광부 stone farmer",
  },
  {
    battleDate: new Date("2025-12-06"),
    prepWin: true,
    battleWin: true,
    president: "[DOL]야이돌모찌",
    supreme: true,
  },
  {
    battleDate: new Date("2025-11-08"),
    prepWin: true,
    battleWin: true,
    president: "[ABS]어부 Oner chef",
    supreme: true,
  },
  {
    battleDate: new Date("2025-10-11"),
    prepWin: false,
    battleWin: false,
    president: "#2280 [UNO]Wanna Play",
    supreme: false,
  },
  {
    battleDate: new Date("2025-09-13"),
    prepWin: true,
    battleWin: false,
    president: "[ABS]희야링 Onion_ring",
  },
  {
    battleDate: new Date("2025-08-16"),
    prepWin: true,
    battleWin: false,
    president: "[ABS]희야링 Onion_ring",
  },
  {
    battleDate: new Date("2025-07-19"),
    prepWin: false,
    battleWin: true,
    president: "[ABS]기모찌 Ssick Bbang",
  },
  {
    battleDate: new Date("2025-06-21"),
    prepWin: true,
    battleWin: false,
    president: "[ABS]기모찌",
  },
  {
    battleDate: new Date("2025-05-24"),
    prepWin: true,
    battleWin: true,
    president: "[ABS]기모찌",
    supreme: true,
  },
  {
    battleDate: new Date("2025-04-26"),
    prepWin: false,
    battleWin: false,
    president: "#2282 [ACE]takapan",
    supreme: false,
  },
  {
    battleDate: new Date("2025-03-29"),
    prepWin: false,
    battleWin: false,
    president: "#2301 [RIP]Sef",
    supreme: false,
  },
];

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
        <h1 class="relative z-10 max-w-7xl mx-auto px-6 w-full text-center text-8xl xl:text-[10rem] font-bold animate-fade-down">
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
          <h2 class="text-3xl md:text-5xl font-bold">Top 5 alliances</h2>
          <span class="text-gray-400 mt-2 text-xs md:text-base">
            Last Updated: Mar 30, 2026, 15:00
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
          <h2 class="text-3xl md:text-5xl font-bold">SvS Record</h2>
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
