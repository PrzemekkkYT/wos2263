// default import
import moment from "moment";
import type { DataGroup, TimelineOptions } from "vis-timeline";

// local import
import { getEventIconUrl } from "@/utils/utils";
import type { EventItem } from "./utils/types";

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
    return moment(date).utc(); // Wymusza renderowanie osi czasu w UTC
  },
  align: "center",
  template: (item: EventItem) => {
    const rawClass = item.group?.toString() || "default";
    const iconName = rawClass.replaceAll("-", "_");

    const iconUrl = getEventIconUrl(iconName);

    return `
      <div class="item-wrapper">
        ${!iconUrl.includes("undefined") ? "<img src=" + iconUrl + ' alt="" loading="lazy"/>' : ""}
        <span class="item-text ">${item.content}</span>
      </div>
    `;
  },
  groupTemplate: (group: DataGroup) => {
    if (!group || !group.id) {
      return document.createElement("div");
    }

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
      img.loading = "lazy";

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
