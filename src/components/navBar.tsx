import { Link, useRoute } from "wouter";

function ActiveLink(props: { href: string; children: any; class?: string }) {
  const [isActive] = useRoute(props.href);

  return (
    <Link
      {...props}
      class={`ref-button ${isActive ? "selected" : ""} ${props.class}`}
    >
      {props.children}
    </Link>
  );
}

export function NavBar() {
  return (
    <nav class="fixed top-0 w-full z-50 bg-slate-900/90">
      <div class="size-full bg-slate-950/50">
        <div class="flex flex-row items-center justify-center px-6 py-4 max-w-7xl mx-auto">
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/recruitment">Recruitment</ActiveLink>
          <ActiveLink href="/calendar">Calendar</ActiveLink>
          <div class="relative group">
            <span class="ref-button cursor-pointer select-none">Tools</span>

            <div class="absolute left-1/2 top-full hidden -translate-x-1/2 pt-2 group-hover:block">
              <div class="min-w-60 min-h-20 p-2 flex flex-col justify-center items-start rounded-md border border-slate-800 bg-slate-900/95 shadow-lg backdrop-blur">
                <ActiveLink
                  href="/tools/dreamscapememory"
                  class="p-3! pb-2! mb-2"
                >
                  Dreamscape Memory
                </ActiveLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
