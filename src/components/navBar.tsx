import { Link, useRoute } from "wouter";

function ActiveLink(props: { href: string; children: any }) {
  const [isActive] = useRoute(props.href);

  return (
    <Link {...props} class={`ref-button ${isActive ? "selected" : ""}`}>
      {props.children}
    </Link>
  );
}

export function NavBar() {
  return (
    <nav class="fixed top-0 w-full z-50 bg-slate-900/99">
      <div class="flex flex-row items-center justify-center px-6 py-4 max-w-7xl mx-auto">
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/recruitment">Recruitment</ActiveLink>
        <ActiveLink href="/calendar">Calendar</ActiveLink>
      </div>
    </nav>
  );
}
