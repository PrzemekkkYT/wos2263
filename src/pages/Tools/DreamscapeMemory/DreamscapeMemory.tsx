import "@/styles/shared.css";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

import arena from "./season2/arena/arena.png";
import { arenaObjects } from "./season2/arena/arena";

const OBJECTS = arenaObjects;

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DreamscapeMemoryPage() {
  const [foundIds, setFoundIds] = useState<Set<string>>(() => new Set());
  const [timeMs, setTimeMs] = useState(0);
  const [running, setRunning] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const objects = useMemo(() => OBJECTS, []);
  const remaining = objects.filter((o) => !foundIds.has(o.id));
  const allFound = remaining.length === 0;

  const [order, setOrder] = useState<string[]>(() =>
    shuffle(OBJECTS.map((o) => o.id)),
  );

  const [objectiveIds, setObjectiveIds] = useState<string[]>(() =>
    order.slice(0, 3),
  );

  const [nextOrderIdx, setNextOrderIdx] = useState(() => 3);

  const objectiveIdSet = useMemo(() => new Set(objectiveIds), [objectiveIds]);

  const clearMsgTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => setTimeMs((v) => v + 100), 100);
    return () => window.clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (allFound) {
      setRunning(false);
      setMessage(`Done! Time: ${(timeMs / 1000).toFixed(1)}s`);
    }
  }, [allFound, timeMs]);

  useEffect(() => {
    return () => {
      if (clearMsgTimerRef.current)
        window.clearTimeout(clearMsgTimerRef.current);
    };
  }, []);

  function reset() {
    const newOrder = shuffle(OBJECTS.map((o) => o.id));
    setFoundIds(new Set());
    setTimeMs(0);
    setRunning(true);
    setMessage(null);

    setOrder(newOrder);
    setObjectiveIds(newOrder.slice(0, 3));
    setNextOrderIdx(3);
  }

  function markFound(id: string, name: string) {
    setFoundIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    setObjectiveIds((prev) => {
      const slot = prev.indexOf(id);
      if (slot === -1) return prev;

      let candidate: string | null = null;

      setNextOrderIdx((idx) => {
        let i = idx;
        while (i < order.length) {
          const nextId = order[i];
          const alreadyFound = foundIds.has(nextId) || nextId === id;
          const alreadyShown = prev.includes(nextId);
          i++;
          if (!alreadyFound && !alreadyShown) {
            candidate = nextId;
            break;
          }
        }
        return i;
      });

      const next = [...prev];
      if (candidate) {
        next[slot] = candidate;
      } else {
        next.splice(slot, 1);
      }
      return next;
    });

    setMessage(`${name} found!`);
    if (clearMsgTimerRef.current) window.clearTimeout(clearMsgTimerRef.current);
    clearMsgTimerRef.current = window.setTimeout(() => setMessage(null), 900);
  }

  return (
    <main className="p-3 sm:p-4">
      <section className="mx-auto max-w-4xl">
        <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <div className="text-sm opacity-70">Time</div>
              <div className="font-semibold">{(timeMs / 1000).toFixed(1)}s</div>
            </div>

            <div>
              <div className="text-sm opacity-70">Remaining</div>
              <div className="font-semibold">{remaining.length}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded border px-3 py-2" onClick={reset}>
              Reset
            </button>
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-[1fr_240px]">
          <div
            className="relative w-full overflow-hidden rounded border"
            style={{
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <img
              src={arena}
              alt="Dreamscape"
              className="block h-auto w-full select-none"
              draggable={false}
            />

            {objects.map((o) => {
              const found = foundIds.has(o.id);
              const visible = !found;
              if (!visible) return null;

              const inObjective = objectiveIdSet.has(o.id);
              const collectible = inObjective && !allFound && !found;

              const minTapPx = 10;

              return (
                <button
                  key={o.id}
                  type="button"
                  aria-label={`Find ${o.name}`}
                  disabled={!collectible}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    if (collectible) markFound(o.id, o.name);
                  }}
                  title={!inObjective ? "Not in objective" : undefined}
                  style={{
                    position: "absolute",
                    left: `${o.xPct}%`,
                    top: `${o.yPct}%`,
                    width: `max(${o.wPct}%, ${minTapPx}px)`,
                    transform: "translate(-50%, -50%)",
                    padding: 0,
                    border: "none",
                    background: "transparent",
                  }}
                >
                  <img
                    src={o.src}
                    alt={o.alt}
                    draggable={false}
                    className="block h-auto w-full select-none"
                    style={{ pointerEvents: "none" }}
                  />
                </button>
              );
            })}
          </div>

          <aside className="rounded border p-3 overflow-x-scroll">
            <div className="text-sm flex flex-row md:flex-col justify-evenly items-center gap-2">
              {objectiveIds.map((id) => {
                const o = objects.find((x) => x.id === id);
                if (!o) return null;
                return (
                  <div
                    key={o.id}
                    className="flex items-center justify-center border rounded-xl bg-slate-700 p-2 min-w-1/4"
                  >
                    <span>{o.name}</span>
                    <span className="opacity-70"></span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        {message ? (
          <div className="mt-3 rounded border p-2 text-sm">{message}</div>
        ) : null}
      </section>
    </main>
  );
}
