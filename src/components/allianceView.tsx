import { formatPower, getGloryIcons } from "@/utils/alliance";
import type { Alliance } from "@/utils/types";
import { getBannerUrl } from "@/utils/utils";

export function AllianceView({ alliance }: { alliance: Alliance }) {
  console.log(alliance);
  return (
    <div class="flex flex-row  bg-slate-800 rounded-2xl border border-slate-200/10">
      <div class="flex justify-center items-center bg-slate-900 rounded-l-2xl w-1/4 p-12">
        <img src={getBannerUrl(alliance.tag)} class="size-48" />
      </div>
      <div class="flex flex-row justify-between w-3/4 px-6 py-8 gap-10">
        <div class="flex flex-col w-1/3 justify-between">
          {/* name */}
          <div class="flex flex-col mb-4 justify-center min-w-fit">
            <span class="text-3xl">
              <span class="font-bold">[{alliance.tag}]</span> {alliance.name}
            </span>
            <span class="text-2xl">{formatPower(alliance.power)} Power</span>
            {alliance.glory && (
              <div
                class="flex items-center gap-4 mt-2"
                title={`Glory Path of the alliance | ${alliance.glory} SvS battles won`}
              >
                {getGloryIcons(alliance.glory).map((iconPath, index) => (
                  <img
                    key={index}
                    src={iconPath}
                    alt="Glory Icon"
                    class="size-8"
                  />
                ))}
              </div>
            )}
          </div>
          {/* requirements */}
          <div class="flex flex-row justify-between">
            <div class="flex flex-row gap-12 size-full">
              <div class="flex flex-col">
                <span class="font-bold">Requirements</span>
                {alliance.recruitment?.requirements.map((req) => (
                  <span>{req}</span>
                ))}
              </div>
              <div class="flex flex-col">
                <span class="font-bold">Language</span>
                {alliance.recruitment?.language}
              </div>
            </div>
          </div>
        </div>
        {/* recruiters */}
        {alliance.recruitment?.recruiters && (
          <div class="flex flex-col w-1/3">
            <span class="font-bold">Recruiters</span>
            <div class="flex flex-col items-left">
              {alliance.recruitment?.recruiters.map((recruiter) => (
                <div class="flex flex-row gap-3 border-slate-500/30 rounded p-2 justify-between w-full">
                  <div class="flex flex-row items-center gap-3 w-1/2">
                    <img
                      src={recruiter.image}
                      alt={recruiter.name}
                      class="size-12 rounded"
                    />
                    <span class="min-w-fit">{recruiter.name}</span>
                  </div>
                  <div class="flex flex-row justify-end 2xl:justify-center items-center gap-3 w-1/2">
                    {recruiter.contact.map((contact) => (
                      <a
                        href={contact.url}
                        target="_blank"
                        class="bg-slate-900/50 hover:bg-slate-950/70 rounded cursor-pointer"
                      >
                        <img
                          src={contact.mediaIcon}
                          alt=""
                          class="size-12 p-1"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* event timings */}
        <div class="w-1/3 flex flex-col items-end">
          <span class="font-bold">Event timings (UTC)</span>
          <div class="mt-2 grid grid-cols-2 grid-rows-3 bg-slate-900/50 rounded p-3 w-full">
            {alliance.recruitment?.events &&
              Array.from(alliance.recruitment.events.entries()).map(
                ([event, time]) => (
                  <div class="flex flex-col p-1" key={event}>
                    <span class="text-sm text-gray-400">{event}</span>
                    <span class="font-bold">{time}</span>
                  </div>
                ),
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
