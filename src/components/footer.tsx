export function Footer() {
  return (
    <footer class="bg-slate-950/50 flex flex-col md:flex-row justify-between items-center px-12 py-4 text-center">
      <div class="text-center">
        <span class="md:text-2xl z-50 mt-8">Get Whiteout Survival</span>
        <div class="flex flex-row gap-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.gof.global"
            class="z-10"
            target="_blank"
          >
            <img
              src="src/assets/logos/googleplay.svg"
              alt="play whiteout survival"
              class="h-8 p-2 md:h-12 md:p-3 box-content"
            />
          </a>
          <a
            href="https://apps.apple.com/us/app/whiteout-survival/id6443575749"
            class="z-10"
            target="_blank"
          >
            <img
              src="src/assets/logos/appstore.svg"
              alt="play whiteout survival"
              class="h-8 p-2 md:h-12 md:p-3 box-content"
            />
          </a>
        </div>
      </div>
      <span class="mt-4 text-xs md:text-base text-gray-400">
        Website not affiliated with Century Games PTE. LTD.
      </span>
      <span class="mt-4 text-xs md:text-base text-gray-400">
        © 2026 [ONE]Przemekkk ᴼᴺᴱ
        <br />
        Version: 1.1
      </span>
    </footer>
  );
}
