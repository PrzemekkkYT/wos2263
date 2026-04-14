import { AllianceView } from "@/components/allianceView";
import { alliances } from "@/data/alliances";

export function RecruitmentPage() {
  return (
    <main>
      <section class="mt-24 min-h-[40vh]!">
        <h1 class="relative z-10 max-w-7xl mx-auto px-6 w-full text-center text-6xl md:text-8xl xl:text-[10rem] font-bold animate-fade-down">
          Alliances
        </h1>
      </section>
      <section class="px-0!">
        <div class="flex flex-col gap-8 w-11/12">
          {alliances.map(
            (al) => al.recruitment && <AllianceView alliance={al} />,
          )}
        </div>
      </section>
    </main>
  );
}
