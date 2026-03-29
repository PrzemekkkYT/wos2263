// css import
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "../../styles/shared.css";
import "./style.css";

import moment from "moment";
import {
  type DataGroup,
  type DataItem,
  type DateType,
  Timeline,
  type TimelineOptions,
} from "vis-timeline";
import { DataSet } from "vis-data";

import { type EventItem } from "./utils/types";
import { fetchApiData } from "./api";

import { addDays, getEventIconUrl, startOfDay } from "../../utils/utils";
import { processEventItems, processEvents, processGroups } from "./processor";
import { findNextOccurrence, startCountdown } from "./utils/utils";

const options: TimelineOptions = {
  stack: false,
  stackSubgroups: true,
  groupHeightMode: "fixed",
  showCurrentTime: true,
  orientation: "both",
  margin: { item: 10, axis: 5 },
  timeAxis: { scale: "day", step: 1 },
  zoomable: false,
  selectable: false,
  min: new Date(Date.UTC(2024, 11, 25, 0, 0, 0)),
  maxHeight: "70vh",
  verticalScroll: true,
  autoResize: true,
  type: "range",
  format: {
    minorLabels: {
      day: "ddd D",
    },
    majorLabels: {
      day: "MMMM YYYY",
    },
  },
  moment: (date: moment.MomentInput) => {
    return moment(date).utc(); // Wymusza renderowanie osi czasu w UTC
  },
  align: "center",
  template: (item: EventItem) => {
    const rawClass = item.group?.toString() || "default";
    const iconName = rawClass.replaceAll("-", "_");

    const iconUrl = getEventIconUrl(iconName);

    return `
      <div class="item-wrapper">
        ${!iconUrl.includes("undefined") ? "<img src=" + iconUrl + ' alt=""/>' : ""}
        <span class="item-text ">${item.content}</span>
      </div>
    `;
  },
  groupTemplate: (group: DataGroup) => {
    const rawClass = group.id.toString() || "default";
    const iconName = rawClass.replaceAll("-", "_");

    const iconUrl = getEventIconUrl(iconName);

    const cont = document.createElement("div");
    cont.className = "item-wrapper";

    const cont2 = document.createElement("div");
    cont2.className = "item-title";

    if (!iconUrl.includes("undefined")) {
      const img = document.createElement("img");
      img.src = iconUrl;
      img.alt = "";

      cont2.appendChild(img);
    }

    const span = document.createElement("span");
    span.classList = `item-text ${iconUrl.includes("undefined") ? "" : "hidden"} sm:block!`;
    span.innerHTML = group.content.toString();

    cont2.appendChild(span);

    cont.appendChild(cont2);

    if (!group.nestedGroups) {
      const btn = document.createElement("button");
      btn.className = "occurrence-jump";
      btn.onclick = () => jumpToNextOccurrence(group.id.toString());
      btn.innerHTML = ">";
      btn.title = "Jump to closest occurrence";

      cont.appendChild(btn);
    }

    return cont;
  },
};

let { items, eventItems, groups, groupOrderSetting } = await fetchApiData();

let processed_groups = processGroups(groups, items, groupOrderSetting);
let displayedItems = new DataSet<DataItem>();

let genCountdownStarted = false;
let otherCountdownStarted = false;

function initTimeline() {
  const container = document.getElementById("main-events-timeline");
  if (!container) {
    throw new Error('Missing element with id "main-events-timeline"');
  }

  const timeline = new Timeline(
    container,
    displayedItems,
    processed_groups,
    options,
  );

  applyHooks(timeline);

  const now = startOfDay(new Date());

  if (window.innerWidth < 768) {
    timeline.setWindow(addDays(now, -2), addDays(now, 2), {
      animation: false,
    });
  } else {
    timeline.setWindow(addDays(now, -3), addDays(now, 11), {
      animation: false,
    });
  }

  setTimeout(() => {
    timeline.redraw();
  }, 200);
  setTimeout(() => {
    timeline.focus("focus-element", {
      zoom: false,
      animation: false,
    });
  }, 200);

  return timeline;
}

function applyHooks(timeline: Timeline) {
  timeline.on("rangechanged", () => {
    let newItems: EventItem[] = [
      {
        content: "",
        start: new Date(),
        id: "focus-element",
        group: "state-changes",
        type: "point",
        className: "hidden",
      },
    ];
    newItems.push(
      ...processEvents(
        items,
        timeline.getWindow().start,
        timeline.getWindow().end,
      ),
    );
    newItems.push(
      ...processEventItems(
        eventItems,
        timeline.getWindow().start,
        timeline.getWindow().end,
      ),
    );
    displayedItems.clear();
    displayedItems.update(newItems);
    startGenCountdown();
    startOtherStateEventCountdown();
  });
}

const timeline = initTimeline();

document.querySelector("#today-button")?.addEventListener("click", () => {
  focusOnDate(new Date());
});

document.querySelector("#beginning-button")?.addEventListener("click", () => {
  const beginning = startOfDay(new Date(Date.UTC(2024, 11, 24, 0, 0, 0)));
  timeline.setWindow(beginning, addDays(beginning, 9), {
    animation: true,
  });

  timeline.focus;
});

document.querySelector("#jump-to-date")?.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;

  const date = new Date(`${target.value}T00:00:00Z`);
  // console.log(date);
  focusOnDate(date);
});

document.querySelector("#data-theme-toggle")?.addEventListener("click", () => {
  const htmlElement = document.querySelector("html");

  const curTheme = htmlElement?.getAttribute("data-theme");
  const newTheme = curTheme === "dark" ? "light" : "dark";

  htmlElement?.setAttribute("data-theme", newTheme);
});

function jumpToNextOccurrence(eventGroupId: string) {
  // const nextEvent = findNextOccurrence(displayedItems, eventGroupId);
  const nextEvent = findNextOccurrence(items, eventGroupId, eventItems);

  if (nextEvent) {
    // timeline.focus(nextEvent.id, { zoom: false, animation: true });

    const eventStart = new Date(nextEvent.start);
    const eventEnd = new Date(nextEvent.end || nextEvent.start);

    const eventTime =
      eventStart.getTime() + (eventEnd.getTime() - eventStart.getTime()) / 2;

    focusOnDate(eventTime);
  } else {
    // Opcjonalnie: Jeśli nie ma nic w przyszłości, skocz do ostatniego dostępnego
    console.warn(
      "Brak przyszłych wydarzeń. Możesz tu dodać skok do ostatniego archiwalnego.",
    );
  }
}

function focusOnDate(date: DateType) {
  const currentWindow = timeline.getWindow();
  const windowDuration =
    currentWindow.end.getTime() - currentWindow.start.getTime();

  const fixedDate = new Date(date);

  const newStart = fixedDate.getTime() - windowDuration / 2;
  const newEnd = fixedDate.getTime() + windowDuration / 2;

  timeline.setWindow(newStart, newEnd);
}

function startGenCountdown() {
  if (genCountdownStarted) return;

  genCountdownStarted = true;

  // let nextGenEvent = findNextOccurrence(contentItems, "hero-generation");
  let nextGenEvent = findNextOccurrence(items, "hero-generation");
  const nextGenCountdownContainer =
    document.getElementById("next-gen-countdown");
  const nextGenCountdownTitle = document.getElementById(
    "next-gen-countdown-title",
  );
  const nextGenCountdown = document.getElementById("next-gen-countdown-timer");

  if (nextGenEvent === null) {
    nextGenCountdownContainer?.remove();
    return;
  }

  startCountdown(
    nextGenEvent,
    nextGenCountdownContainer!,
    nextGenCountdownTitle!,
    nextGenCountdown!,
    (title) => `Time until ${title}:`,
    (d, h, m, s) => `${d}d ${h}h ${m}m ${s}s`,
  );
}

function startOtherStateEventCountdown() {
  if (otherCountdownStarted) return;

  otherCountdownStarted = true;

  let nextOtherEvent = findNextOccurrence(
    items,
    "other-state-changes",
    eventItems,
  );
  const OtherEventCountdownContainer = document.getElementById(
    "next-other-state-event-countdown",
  );
  const OtherEventCountdownTitle = document.getElementById(
    "next-other-state-event-countdown-title",
  );
  const OtherEventCountdown = document.getElementById(
    "next-other-state-event-countdown-timer",
  );
  if (nextOtherEvent === null) {
    OtherEventCountdownContainer?.remove();
    return;
  }

  startCountdown(
    nextOtherEvent,
    OtherEventCountdownContainer!,
    OtherEventCountdownTitle!,
    OtherEventCountdown!,
    (title) => `Time until ${title}:`,
    (d, h, m, s) => `${d}d ${h}h ${m}m ${s}s`,
  );
}

for (let btn of document.getElementById("time-buttons-container")?.children ??
  []) {
  btn.addEventListener("click", () => {
    // const now = startOfDay(new Date());
    const currentWindow = timeline.getWindow();
    const centerDay = new Date(
      currentWindow.start.getTime() +
        (currentWindow.end.getTime() - currentWindow.start.getTime()) / 2,
    );

    switch (btn.getAttribute("time-window")) {
      case "3d":
        timeline.setWindow(addDays(centerDay, -1), addDays(centerDay, 2), {
          animation: true,
        });
        break;
      case "1w":
        timeline.setWindow(addDays(centerDay, -3), addDays(centerDay, 4), {
          animation: true,
        });
        break;
      case "2w":
        timeline.setWindow(addDays(centerDay, -7), addDays(centerDay, 7), {
          animation: true,
        });
        break;
      case "1m":
        timeline.setWindow(addDays(centerDay, -14), addDays(centerDay, 14), {
          animation: true,
        });
        break;

      default:
        break;
    }
  });
}
