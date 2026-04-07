import { AllianceView } from "@/components/allianceView";
import { alliances } from "@/data/alliances";

export function RecruitmentPage() {
  return (
    <main>
      <section>
        <h1 class="relative z-10 max-w-7xl mx-auto px-6 w-full text-center text-5xl xl:text-[7rem] font-bold animate-fade-down">
          Recruitment board
        </h1>
        <span class="text-xl xl:text-2xl z-10 mt-8 mb-2">
          Explore our alliances, contact our recruiters
        </span>
      </section>
      <section class="mt-24 px-0!">
        <div class="flex flex-col gap-8 w-11/12">
          {alliances.map(
            (al) => al.recruitment && <AllianceView alliance={al} />,
          )}
        </div>
      </section>
    </main>
  );
}
