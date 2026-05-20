// default import
import moment from "moment";
import type { TimelineOptions } from "vis-timeline";

// local import
import type { EventGroup, EventItem } from "./utils/types";

export const options: TimelineOptions = {
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
    return moment(date).utc();
  },
  align: "center",
  template: (item: EventItem) => {
    return `
      <div class="item-wrapper">
        ${item.iconPath ? "<img src=" + item.iconPath + ' alt=""/>' : ""}
        <span class="item-text ">${item.content}</span>
      </div>
    `;
  },
  groupTemplate: (group: EventGroup) => {
    if (!group || !group.id) {
      return document.createElement("div");
    }

    const cont = document.createElement("div");
    cont.className = "item-wrapper";

    const cont2 = document.createElement("div");
    cont2.className = "item-title";

    if (group.iconPath) {
      const img = document.createElement("img");
      img.src = group.iconPath;
      img.alt = "";

      cont2.appendChild(img);
    }

    const span = document.createElement("span");
    span.classList = `item-text ${group.iconPath ? "hidden" : ""} sm:block!`;
    span.innerHTML = group.content.toString();

    cont2.appendChild(span);

    cont.appendChild(cont2);

    if (!group.nestedGroups) {
      const btn = document.createElement("button");
      btn.className = "occurrence-jump";
      btn.onclick = () =>
        window.dispatchEvent(
          new CustomEvent("timeline:jump", { detail: group.id }),
        );
      btn.innerHTML = ">";
      btn.title = "Jump to closest occurrence";

      cont.appendChild(btn);
    }

    return cont;
  },
};
