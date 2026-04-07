import { formatPower, getGloryIcons } from "@/utils/alliance";
import { getBannerUrl } from "@/utils/utils";
import type { Alliance } from "@/utils/types";

import G1 from "@/assets/icons/glory1.png";

export function AllianceBigCard({
  data,
  rank,
}: {
  data: Alliance;
  rank: number;
}) {
  return (
    <div class="md:col-span-2 bg-slate-800 rounded-xl p-4 border border-slate-200/10 relative overflow-hidden group">
      <div class="absolute top-0 right-0 p-4">
        <span class="text-6xl font-black text-sky-400/10 select-none">
          #{rank.toString().padStart(2, "0")}
        </span>
      </div>
      <div class="relative z-10">
        <div class="flex flex-row items-end mb-6">
          <div class="p-2 w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center">
            <img src={getBannerUrl(data.tag)} alt={data.tag} />
          </div>
        </div>
        <h3 class="text-2xl font-bold mb-2">
          [{data.tag}] {data.name}
        </h3>
        <p class="text-sky-400 text-xl font-medium mb-6">
          {formatPower(data.power)} Power
        </p>
        {data.glory && (
          <div
            class="flex items-center gap-4 py-4 border-t border-slate-500"
            title={`Glory Path of the alliance | ${data.glory} SvS battles won`}
          >
            {getGloryIcons(data.glory).map((iconPath, index) => (
              <img key={index} src={iconPath} alt="Glory Icon" class="size-8" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function AllianceSmallCard({
  data,
  rank,
}: {
  data: Alliance;
  rank: number;
}) {
  return (
    <div class="bg-slate-800/50 p-6 md:p-4 rounded-xl border border-slate-500/30 transition-colors">
      <div class="flex justify-between items-start mb-4">
        <span class="text-sky-400 font-bold">
          #{rank.toString().padStart(2, "0")}
        </span>
        <img src={getBannerUrl(data.tag)} alt={data.tag} class="size-12" />
      </div>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <h4 class="font-bold">
            [{data.tag}] {data.name}
          </h4>
          <p class="text-gray-400 text-sm">{formatPower(data.power)} Power</p>
        </div>
        {data.glory && (
          <div
            class="flex flex-row items-end"
            title={`${data.glory} SvS battles won`}
          >
            <img src={G1} alt="Glory" class="size-6" />x{data.glory}
          </div>
        )}
      </div>
    </div>
  );
}
