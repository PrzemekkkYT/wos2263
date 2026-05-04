import { AllianceView } from "@/components/allianceView";
// import { useStateApi } from "@/utils/hooks";
// import { alliances } from "@/data/alliances";

// const sortedAl = [...alliances].sort((a, b) => b.power - a.power);

import { apiData } from "@/utils/stateApi";
import type { StateApiFetch } from "@/utils/types";

export function RecruitmentPage() {
  // const apiData = useStateApi();
  const data: StateApiFetch | null = apiData.value;

  return (
    <main>
      <section class="mt-24 min-h-[40vh]! items-start!">
        <h1 class="relative z-10 max-w-7xl w-full tracking-tight text-left text-6xl md:text-8xl xl:text-[10rem] font-bold animate-fade-down">
          Recruitment
        </h1>
        <h5 class="relative z-10 max-w-7/8 px-6 mt-4 text-sm md:text-lg">
          Browse our top alliances, check their requirements and schedules, and
          see whether a transfer is right for you.
        </h5>
      </section>
      <section>
        <div class="flex flex-col gap-8 w-full">
          {(data?.alliances ?? Array.from({ length: 5 })).map((al) => (
            <AllianceView alliance={al} />
          ))}
        </div>
      </section>
    </main>
  );
}
