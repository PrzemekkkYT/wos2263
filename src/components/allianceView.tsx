import { formatPower, getGloryIcons } from "@/utils/alliance";
import type { Alliance } from "@/utils/types";
import { getBannerUrl } from "@/utils/utils";

export function AllianceView({ alliance }: { alliance: Alliance }) {
  return (
    <div class="flex flex-col bg-slate-800 px-2 py-6 xl:p-10 rounded-lg">
      <div class="mb-10">
        <div class="flex items-center gap-6">
          <img src={getBannerUrl(alliance.tag)} class="size-32" />
          <div>
            <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-1">
              [{alliance.tag}] {alliance.name}
            </h2>
            <div class="flex flex-row items-center justify-between min gap-10">
              <h3 class="md:text-xl font-bold text-sky-400">
                {formatPower(alliance.power)} Power
              </h3>
              <h4 class="text-gray-400 md:text-xl">
                {alliance.playerCount}/100 Players
              </h4>
            </div>
            {alliance.glory && (
              <div
                class="flex items-center gap-2 mt-2"
                title={`Glory Path of the alliance | ${alliance.glory} SvS battles won`}
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
        <div class="p-4">
          <h3 class="mb-6 text-sky-500 font-bold tracking-widest">
            Requirements
          </h3>
          <ul class="space-y-4">
            {Array.from(
              alliance.recruitment?.requirements?.entries() ?? [],
            ).map(([key, value]) => (
              <li key={key} class="flex items-center justify-between text-sm">
                <span class="text-gray-300">{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div class="p-4">
          <h3 class="mb-6 text-sky-500 font-bold tracking-widest">
            Event Timings (UTC)
          </h3>
          <div class="grid grid-cols-2 gap-y-4 gap-x-6">
            {(() => {
              const events = alliance.recruitment?.events;
              if (!events) return null;

              const items: Array<[label: string, time?: string]> = [
                ["Bear Trap", events.bearTrap],
                ["Foundry", events.foundry],
                ["Canyon", events.canyon],
                ["Crazy Joe", events.crazyJoe],
                ["Mercenary Bosses", events.mercenary],
              ];

              return items
                .filter(([, time]) => Boolean(time))
                .map(([label, time]) => (
                  <div key={label} class="flex flex-col">
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
              Contact
            </span>
            <div class="flex flex-wrap gap-8 items-center">
              <div class="flex flex-wrap gap-12 items-start">
                {alliance.recruitment?.recruiters?.map((recruiter) => (
                  <div class="flex flex-row gap-3">
                    <img
                      src={recruiter.image}
                      alt={recruiter.name}
                      class="size-14 rounded-lg object-cover"
                    />
                    <div class="flex flex-col">
                      <h3 class="font-bold">{recruiter.name}</h3>
                      <div class="flex flex-row">
                        {recruiter.contact.map(({ mediaIcon, url }) => (
                          <a href={url} target="_blank">
                            <img src={mediaIcon} alt="" class="size-8" />
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
