import { AllianceView } from "@/components/allianceView";
import { alliances } from "@/data/alliances";

const sortedAl = [...alliances].sort((a, b) => b.power - a.power);

export function RecruitmentPage() {
  return (
    <main>
      <section class="mt-24 min-h-[40vh]! items-start!">
        <h1 class="relative z-10 max-w-7xl mx-auto px-6 w-full tracking-tight text-left text-6xl md:text-8xl xl:text-[10rem] font-bold animate-fade-down">
          Recruitment
        </h1>
        <h5 class="relative z-10 max-w-7/8 px-6 mt-4 text-sm md:text-lg">
          Browse our top alliances, check their requirements and schedules, and
          see whether a transfer is right for you.
        </h5>
      </section>
      <section>
        <div class="flex flex-col gap-8 w-full">
          {sortedAl.map(
            (al) => al.recruitment && <AllianceView alliance={al} />,
          )}
        </div>
      </section>
    </main>
  );
}
