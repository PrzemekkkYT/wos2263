import moment from "moment";
import {
  type DataGroup,
  type DataItem,
  Timeline,
  type TimelineOptions,
} from "vis-timeline";
import { DataSet } from "vis-data";

// css import
import "vis-timeline/styles/vis-timeline-graph2d.min.css";

// import { initGroups } from "./groups";
import { type EventItem } from "./types";
import { fetchApiData } from "./api";
// import "./popup";
// import { openPopup } from "./popup";
import { addDays, getIconUrl, startOfDay } from "../../utils/utils";
import { processEvents, processGroups } from "./processor";
import { findNextOccurrence } from "./utils/utils";

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
  autoResize: false,
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
    // Jeśli item.class jest pusty, używamy domyślnej ikony
    const rawClass = item.group?.toString() || "default";
    const iconName = rawClass.replaceAll("-", "_");
    // const iconPath = `./assets/icons/${iconName}.png`;

    return `
      <div class="item-wrapper">
        <img src="${getIconUrl(iconName)}" alt="" />
        <span class="item-text">${item.content}</span>
      </div>
    `;
  },
  // groupTemplate: (group: DataGroup) => {
  //   const rawId = group.id.toString() || "default";
  //   const iconName = rawId.replaceAll("-", "_");
  //   const iconPath = `./assets/icons/${iconName}.png`;

  //   return `
  //     <div class="item-wrapper">
  //       <img src="${iconPath}" alt="" />
  //       <span class="item-text">${group.content}</span>
  //     </div>
  //   `;
  // },
  groupTemplate: (group: DataGroup) => {
    const rawClass = group.id.toString() || "default";
    const iconName = rawClass.replaceAll("-", "_");

    const cont = document.createElement("div");
    cont.className = "item-wrapper";

    const cont2 = document.createElement("div");
    cont2.className = "item-title";

    const img = document.createElement("img");
    img.src = getIconUrl(iconName);
    img.alt = "";

    const span = document.createElement("span");
    span.className = "item-text";
    span.innerHTML = group.content.toString();

    cont2.appendChild(img);
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

// let items = new DataSet<DataItem>([
//   // {
//   //   id: "events",
//   //   start: new Date(Date.UTC(2026, 1, 5, 0, 0, 0)),
//   //   end: new Date(Date.UTC(2026, 1, 6, 0, 0, 0)),
//   //   content: "Events",
//   //   group: "test1",
//   //   style: `background-color: #ffd966; color: white; border: none; border-radius: 4px;`,
//   // },
// ]);

// let groups = parseEventGroupsData(await apiFetchGroups());
// let items = parseTimelineData(await apiFetchEvents());

let { items, groups, groupOrderSetting } = await fetchApiData();

console.log(items);
console.log(groups);
console.log(groupOrderSetting);

let processed_groups = processGroups(groups, items, groupOrderSetting);
let displayedItems = new DataSet<DataItem>();
// displayedItems.add({
//   content: "",
//   start: new Date(),
//   id: "focus-element",
//   group: "state-changes",
//   type: "point",
// });

// console.log(processed_groups);

let countdownStarted = false;

function initTimeline() {
  const container = document.getElementById("main-events-timeline");
  if (!container) {
    throw new Error('Missing element with id "main-events-timeline"');
  }

  // const timeline = new Timeline(container, items, initGroups(groups), options);
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

  // createButtons();

  setTimeout(() => {
    timeline.redraw();
    // timeline.focus("state-changes", {
    //   zoom: false,
    //   animation: false,
    // });
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
    // console.log(timeline.getWindow().start, timeline.getWindow().end);
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
    displayedItems.update(newItems);
    startGenCountdown(displayedItems);
  });
  //   timeline.on("click", (properties) => {
  //     openPopup(properties, displayedItems);
  //   });
}

const timeline = initTimeline();

// console.log(timeline.getWindow().start, timeline.getWindow().end);

document.querySelector("#today-button")?.addEventListener("click", () => {
  // const now = startOfDay(new Date());
  // timeline.setWindow(addDays(now, -3), addDays(now, 11), {
  //   animation: true,
  // });
  timeline.focus("focus-element", {
    zoom: false,
    animation: true,
  });
});

document.querySelector("#beginning-button")?.addEventListener("click", () => {
  const beginning = startOfDay(new Date(Date.UTC(2024, 11, 24, 0, 0, 0)));
  timeline.setWindow(beginning, addDays(beginning, 9), {
    animation: true,
  });

  timeline.focus;
});

document.querySelector("#data-theme-toggle")?.addEventListener("click", () => {
  const htmlElement = document.querySelector("html");

  const curTheme = htmlElement?.getAttribute("data-theme");
  const newTheme = curTheme === "dark" ? "light" : "dark";

  htmlElement?.setAttribute("data-theme", newTheme);
});

function jumpToNextOccurrence(eventGroupId: string) {
  const nextEvent = findNextOccurrence(displayedItems, eventGroupId);

  if (nextEvent) {
    // 3. Przesuń oś czasu i zaznacz element
    // timeline.setSelection(nextEvent.id, {
    //   focus: true,
    //   animation: {
    //     animation: {
    //       duration: 500,
    //       easingFunction: "easeInOutQuad",
    //     },
    //   },
    // });

    console.log(eventGroupId);

    const startDate = new Date(nextEvent.start);

    timeline.setWindow(addDays(startDate, -1), addDays(startDate, 7));
  } else {
    // Opcjonalnie: Jeśli nie ma nic w przyszłości, skocz do ostatniego dostępnego
    console.log(
      "Brak przyszłych wydarzeń. Możesz tu dodać skok do ostatniego archiwalnego.",
    );
  }
}

addEventListener("resize", () => {
  // console.log(`resized: ${window.innerWidth}`);
  timeline.redraw();
  if (window.innerWidth < 768) {
    const now = startOfDay(new Date());
    timeline.setWindow(addDays(now, -3), addDays(now, 4), {
      animation: false,
    });
  }
});

function startGenCountdown(items: DataSet<DataItem>) {
  if (countdownStarted) return;

  countdownStarted = true;

  let nextGenEvent = findNextOccurrence(items, "hero-generation");
  const nextGenCountdownContainer =
    document.getElementById("next-gen-countdown");

  let newGenIconUrl = getIconUrl("hero_generation");

  const countdownInterval = setInterval(() => {
    if (nextGenEvent) {
      const nextGenDate = nextGenEvent.start;
      const now = new Date();
      const timeLeft = (nextGenDate as Date).getTime() - now.getTime();

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");

      nextGenCountdownContainer!.innerHTML = `<img src="${newGenIconUrl}" alt="NewGenIcon">Time until ${nextGenEvent.content}:<br>${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (timeLeft < 0) {
        clearInterval(countdownInterval);
        nextGenCountdownContainer!.innerHTML = "The event has started!";
      }
    }
  }, 1000);
}

export function jumpTo(date: Date) {
  const now = startOfDay(date);
  timeline.setWindow(addDays(now, -3), addDays(now, 11), {
    animation: true,
  });
}

for (let btn of document.getElementById("time-buttons-container")?.children ??
  []) {
  console.log(btn.innerHTML.toString());
  btn.addEventListener("click", () => {
    const now = startOfDay(new Date());

    switch (btn.getAttribute("time-window")) {
      case "3d":
        timeline.setWindow(addDays(now, -1), addDays(now, 1), {
          animation: true,
        });
        break;
      case "1w":
        timeline.setWindow(addDays(now, -3), addDays(now, 4), {
          animation: true,
        });
        break;
      case "2w":
        timeline.setWindow(addDays(now, -7), addDays(now, 7), {
          animation: true,
        });
        break;
      case "1m":
        timeline.setWindow(addDays(now, -14), addDays(now, 14), {
          animation: true,
        });
        break;

      default:
        break;
    }
  });
}
