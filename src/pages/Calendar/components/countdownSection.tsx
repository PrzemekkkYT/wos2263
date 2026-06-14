import { useEffect, useState } from "preact/hooks";
import { findNextOccurrence } from "../utils/utils";
import { useTranslation } from "react-i18next";

interface Props {
  type: string;
  items: any[];
  eventItems?: any[];
  image?: string;
}

export function CountdownSection({ type, items, eventItems, image }: Props) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState<string>("");

  const { t } = useTranslation();

  useEffect(() => {
    const nextEvent = findNextOccurrence(items, type, eventItems);

    if (!nextEvent) {
      setTimeLeft(null);
      return;
    }

    setEventTitle(nextEvent.content);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(nextEvent.start).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Started!");
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      const dd = String(d).padStart(2, "0");
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const ss = String(s).padStart(2, "0");

      setTimeLeft(`${dd}d ${hh}h ${mm}m ${ss}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [type, items, eventItems]);

  if (!timeLeft) return null;

  return (
    <div class="flex gap-1 items-center justify-center bg-slate-700/80 p-2 rounded-2xl text-[0.9rem]">
      <img src={image} class="md:mr-3 w-12 md:w-16" />
      <div class="flex flex-col">
        <span class="">
          {t("page_calendar:time_until", { title: eventTitle })}
        </span>
        <span class="text-sky-400 font-semibold text-base tabular-nums">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
