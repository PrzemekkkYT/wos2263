import background from "@/assets/background.jpg";

export function Background() {
  return (
    <div class="absolute inset-0 z-0 max-h-[60vh]">
      <img
        src={background}
        alt="background"
        class="w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900/70 to-transparent"></div>
      <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
    </div>
  );
}
