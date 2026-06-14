import { getGloryIcons } from "@/utils/alliance";
import type { Alliance } from "@/utils/types";
import { useTranslation } from "react-i18next";

const shimmer = "text-transparent bg-gray-600 animate-pulse rounded";

/**
 * Better than sprinkling `!data && shimmer` everywhere:
 * render a dedicated skeleton branch that matches the final layout.
 * This keeps markup predictable and avoids placeholder text like "[XYZ] Temporary".
 */
export function AllianceBigCard({
  data,
  rank,
}: {
  data: Alliance | null;
  rank: number;
}) {
  if (!data) {
    return <AllianceBigCardSkeleton rank={rank} />;
  }

  const { t } = useTranslation();

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
            <img src={data.banner} alt={data.tag} />
          </div>
        </div>

        <h3 class="text-2xl font-bold mb-2">
          [{data.tag}] {data.name}
        </h3>

        <p class="text-sky-400 text-xl font-medium mb-6">
          {/* {formatPower(data.power)} Power */}
          {t("power", { power: data.power })}
        </p>

        <div
          class="flex items-center gap-4 py-4 border-t border-slate-500"
          title={t("page_home:glory_path", { count: data.glory })}
        >
          {getGloryIcons(data.glory ?? 0).map((iconPath, index) => (
            <img key={index} src={iconPath} alt="Glory Icon" class="size-8" />
          ))}
        </div>
      </div>
    </div>
  );
}

function AllianceBigCardSkeleton({ rank }: { rank: number }) {
  return (
    <div
      class="md:col-span-2 bg-slate-800 rounded-xl p-4 border border-slate-200/10 relative overflow-hidden group"
      aria-busy="true"
      aria-label="Loading alliance"
    >
      <div class="absolute top-0 right-0 p-4">
        <span class="text-6xl font-black text-sky-400/10 select-none">
          #{rank.toString().padStart(2, "0")}
        </span>
      </div>

      <div class="relative z-10">
        <div class="flex flex-row items-end mb-6">
          <div class="p-2 w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center">
            <div class={`w-full h-full ${shimmer}`} />
          </div>
        </div>
      </div>

      <div class={`h-8 w-2/3 mb-2 ${shimmer}`} />
      <div class={`h-7 w-1/3 mb-6 ${shimmer}`} />

      <div class="flex items-center gap-4 py-4 border-t border-slate-500">
        <div class={`size-8 ${shimmer}`} />
        <div class={`size-8 ${shimmer}`} />
        <div class={`size-8 ${shimmer}`} />
      </div>
    </div>
  );
}

export function AllianceSmallCard({
  data,
  rank,
}: {
  data: Alliance | null;
  rank: number;
}) {
  if (!data) {
    return <AllianceSmallCardSkeleton rank={rank} />;
  }

  const { t } = useTranslation();

  return (
    <div class="bg-slate-800/50 p-6 md:p-4 rounded-xl border border-slate-500/30 transition-colors">
      <div class="flex justify-between items-start mb-4">
        <span class="text-sky-400 font-bold">
          #{rank.toString().padStart(2, "0")}
        </span>
        <img src={data.banner} alt={data.tag} class="size-12" />
      </div>

      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <h4 class="font-bold">
            [{data.tag}] {data.name}
          </h4>
          <p class="text-gray-400 text-sm">
            {t("power", { power: data.power })}
          </p>
        </div>

        {data.glory && (
          <div
            class="flex flex-row items-end"
            title={t("page_home:glory_path", { count: data.glory })}
          >
            {getGloryIcons(data.glory).map((iconPath, index) => (
              <img key={index} src={iconPath} alt="Glory Icon" class="size-6" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AllianceSmallCardSkeleton({ rank }: { rank: number }) {
  return (
    <div
      class="bg-slate-800/50 p-6 md:p-4 rounded-xl border border-slate-500/30 transition-colors"
      aria-busy="true"
      aria-label="Loading alliance"
    >
      <div class="flex justify-between items-start mb-4">
        <span class="text-sky-400 font-bold select-none">
          #{rank.toString().padStart(2, "0")}
        </span>
        <div class={`size-12 ${shimmer}`} />
      </div>

      <div class="flex flex-row justify-between">
        <div class="flex flex-col flex-1">
          <div class={`h-5 w-3/4 mb-2 ${shimmer}`} />
          <div class={`h-4 w-1/2 ${shimmer}`} />
        </div>

        <div class="flex flex-row items-end gap-2">
          <div class={`size-6 ${shimmer}`} />
          <div class={`size-6 ${shimmer}`} />
          <div class={`size-6 ${shimmer}`} />
        </div>
      </div>
    </div>
  );
}
