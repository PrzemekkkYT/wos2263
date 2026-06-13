import { useEffect, useRef, useState } from "preact/hooks";
import { DataSet } from "vis-data";
import { Timeline, type DateType } from "vis-timeline/standalone";
import { fetchApiData } from "./api";
import { processEventItems, processEvents, processGroups } from "./processor";
import { options } from "./options";
import { addDays, startOfDay } from "@/utils/utils";

import "./style.css";
import { CountdownSection } from "./components/countdownSection";
import type { ApiFetch } from "./utils/types";
import { findNextOccurrence } from "./utils/utils";

import heroGenIcon from "@/assets/icons/hero_gen.png";
import whiteoutLogo from "@/assets/icons/whiteout_logo.png";

export function CalendarPage() {
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const timelineInstanceRef = useRef<Timeline | null>();
  const displayedItems = useRef(new DataSet<any>());

  const [apiData, setApiData] = useState<ApiFetch | null>(null);

  const [rtl, setRtl] = useState<boolean>(false);

  useEffect(() => {
    fetchApiData().then((data) => {
      console.log(data);
      setApiData(data);
    });
  }, []);

  useEffect(() => {
    if (!timelineContainerRef.current || !apiData) return;

    const now = startOfDay(new Date());
    const range =
      window.innerWidth < 768 ? { start: -1, end: 2 } : { start: -3, end: 11 };

    const { timelineEvents, eventItems, eventGroups, setting } = apiData;
    const processedGroups = processGroups(eventGroups, timelineEvents, setting);

    const timeline = new Timeline(
      timelineContainerRef.current,
      displayedItems.current,
      processedGroups,
      { ...options, rtl: rtl },
    );
    timelineInstanceRef.current = timeline;

    timeline.setWindow(addDays(now, range.start), addDays(now, range.end), {
      animation: false,
    });

    timeline.on("rangechanged", () => {
      const window = timeline.getWindow();
      const newItems = [
        {
          content: "",
          start: new Date(),
          id: "focus-element",
          group: "state-changes",
          type: "point",
          className: "super-hidden",
        },
        ...processEvents(timelineEvents, window.start, window.end),
        ...processEventItems(eventItems, window.start, window.end),
      ];
      displayedItems.current.clear();
      displayedItems.current.update(newItems);
    });

    const focusTimer = setTimeout(() => {
      timeline.setWindow(addDays(now, range.start), addDays(now, range.end), {
        animation: false,
      });
      timeline.focus("focus-element", { zoom: false, animation: false });
    }, 200);

    const jumpToNextOccurrence = (eventGroupId: string) => {
      if (!timelineInstanceRef.current || !displayedItems.current) return;

      const nextEvent = findNextOccurrence(
        apiData.timelineEvents,
        eventGroupId,
        apiData.eventItems,
      );

      if (nextEvent) {
        const eventStart = new Date(nextEvent.start).getTime();
        const eventEnd = new Date(nextEvent.end || nextEvent.start).getTime();
        const center = eventStart + (eventEnd - eventStart) / 2;

        focusOnDate(new Date(center));
      }
    };

    const handleJumpSignal = (e: any) => {
      jumpToNextOccurrence(e.detail);
    };

    window.addEventListener("timeline:jump", handleJumpSignal);

    return () => {
      window.removeEventListener("timeline:jump", handleJumpSignal);
      clearTimeout(focusTimer);
      if (timelineInstanceRef.current) {
        timelineInstanceRef.current.destroy();
        timelineInstanceRef.current = null;
      }
    };
  }, [apiData, rtl]);

  const handleJumpToDate = (e: any) => {
    const date = new Date(`${e.target.value}T00:00:00Z`);
    focusOnDate(date);
  };

  const focusOnDate = (date: DateType) => {
    if (!timelineInstanceRef.current) return;
    const { start, end } = timelineInstanceRef.current.getWindow();
    const duration = end.getTime() - start.getTime();
    const center = new Date(date).getTime();
    timelineInstanceRef.current.setWindow(
      center - duration / 2,
      center + duration / 2,
    );
  };

  const setTimeWindow = (daysBack: number, daysForward: number) => {
    if (!timelineInstanceRef.current) return;
    const { start, end } = timelineInstanceRef.current.getWindow();
    const center = new Date(
      start.getTime() + (end.getTime() - start.getTime()) / 2,
    );
    timelineInstanceRef.current.setWindow(
      addDays(center, daysBack),
      addDays(center, daysForward),
      { animation: true },
    );
  };

  return (
    <main class="relative z-10 flex flex-col my-28 items-center max-h-10/12 gap-2">
      <div class="flex flex-row gap-2 md:gap-4 max-w-screen">
        {apiData && (
          <>
            <CountdownSection
              type="hero-generation"
              items={apiData.timelineEvents}
              image={heroGenIcon}
            />
            <CountdownSection
              type="other-state-changes"
              items={apiData.timelineEvents}
              eventItems={apiData.eventItems}
              image={whiteoutLogo}
            />
          </>
        )}
      </div>
      <div class="bg-blue-200/20 p-2 md:p-8 rounded-2xl shadow-2xl max-w-[96%] w-full">
        <div class="flex justify-between gap-2">
          <div class="flex gap-2">
            <button
              onClick={() => focusOnDate(new Date())}
              class="control-button"
            >
              Today
            </button>
            <input
              type="date"
              onChange={handleJumpToDate}
              class="control-button"
            />
          </div>

          <div class="flex gap-2">
            <button class="control-button" onClick={() => setTimeWindow(-1, 2)}>
              3D
            </button>
            <button class="control-button" onClick={() => setTimeWindow(-3, 4)}>
              1W
            </button>
            <button class="control-button" onClick={() => setTimeWindow(-7, 7)}>
              2W
            </button>
            <button
              class="control-button"
              onClick={() => setTimeWindow(-14, 14)}
            >
              1M
            </button>
          </div>
        </div>
        <div class="flex gap-2 items-center cursor-pointer p-2">
          <label htmlFor="arabic-checkbox">Right to Left</label>
          <input
            type="checkbox"
            name="arabic-checkbox"
            id="arabic-checkbox"
            checked={rtl}
            onChange={(e) =>
              setRtl((e.currentTarget as HTMLInputElement).checked)
            }
          />
        </div>
        <div
          ref={timelineContainerRef}
          key={rtl}
          id="main-events-timeline"
        ></div>
      </div>
    </main>
  );
}
