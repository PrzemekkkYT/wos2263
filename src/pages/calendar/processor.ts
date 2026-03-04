import { DataSet } from "vis-data";
import { type IdType } from "vis-timeline";
import {
  type EventItem,
  type ExtendedDataGroup,
  type Group,
  type TimelineEvent,
} from "./types";
import { addDays } from "../../utils/utils";
import { RRule } from "rrule";

export function processGroups(
  fetchedGroups: Group[],
  fetchedEvents: TimelineEvent[],
  topLevelOrder: string[],
) {
  const groupMap = new Map<string, ExtendedDataGroup>();
  const processedIds = new Set<string>();
  let currentOrder = 0;

  for (let fetchedGroup of fetchedGroups.sort((a, b) => {
    const indexA = topLevelOrder.indexOf(a.groupId);
    const indexB = topLevelOrder.indexOf(b.groupId);

    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  })) {
    groupMap.set(fetchedGroup.groupId, {
      id: fetchedGroup.groupId,
      content: fetchedGroup.name,
      nestedGroups: fetchedGroup.children as IdType[],
      showNested: true,
      style: fetchedGroup.color
        ? `background-color: ${fetchedGroup.color} !important`
        : undefined,
    });
  }

  for (let fetchedEvent of fetchedEvents) {
    groupMap.set(fetchedEvent.eventId, {
      id: fetchedEvent.eventId,
      content: fetchedEvent.title,
    });
  }

  function setOrderRecursive(id: string) {
    if (processedIds.has(id)) return;

    const group = groupMap.get(id);
    if (!group) return;

    group.order = currentOrder++;
    processedIds.add(id);

    if (group.nestedGroups) {
      for (const childId of group.nestedGroups) {
        setOrderRecursive(childId as string);
      }
    }
  }

  const allChildrenIds = new Set(fetchedGroups.flatMap((g) => g.children));
  const rootGroups = fetchedGroups.filter(
    (g) => !allChildrenIds.has(g.groupId),
  );

  for (const root of rootGroups) {
    setOrderRecursive(root.groupId);
  }

  for (let [groupId, group] of groupMap.entries()) {
    if (!processedIds.has(groupId)) {
      group.order = currentOrder++;
    }

    if (group.nestedGroups && group.nestedGroups.length === 0) {
      delete group.nestedGroups;
    }
  }

  return new DataSet<ExtendedDataGroup>([...groupMap.values()]);
}

export function processEvents(
  events: TimelineEvent[],
  rangeStart: Date,
  rangeEnd: Date,
): EventItem[] {
  let newItems: EventItem[] = [];

  const margin = 28;
  const fetchStart = addDays(rangeStart, -margin);
  const fetchEnd = addDays(rangeEnd, margin);

  events.forEach((event) => {
    if (event.recurrenceRules) {
      event.recurrenceRules.forEach((recurrence) => {
        const rule = new RRule({
          freq: recurrence.frequency,
          interval: recurrence.interval,
          byweekday: recurrence.days,
          dtstart: recurrence.startDate,
          wkst: RRule.MO,
          until: recurrence.untilDate,
        });

        const occurrences = rule.between(fetchStart, fetchEnd);

        occurrences.forEach((date) => {
          const n = rule.between(recurrence.startDate, date, true).length;

          const start = date;
          const end = addDays(date, event.durationDays);

          const newItem: EventItem = {
            id: `${event.eventId}-${start.getTime()}`,
            content: event.itemTitle
              ? event.itemTitle.replaceAll("{n}", `${n}`)
              : event.title,
            start: start,
            end: end,
            style: `background-color: ${event.color}`,
            group: event.eventId,
            description: event.description,
          };

          newItems.push(newItem);
        });
      });
    }
    if (event.occurrences) {
      event.occurrences.forEach((occurrence) => {
        const start = new Date(`${occurrence}T00:00:00Z`);
        if (
          start.getTime() > fetchStart.getTime() &&
          start.getTime() < fetchEnd.getTime()
        ) {
          const end = addDays(start, event.durationDays);

          const newItem: EventItem = {
            id: `${event.eventId}-${start.getTime()}`,
            content: event.title,
            start: start,
            end: end,
            style: `background-color: ${event.color}`,
            group: event.eventId,
            description: event.description,
          };

          newItems.push(newItem);
        }
      });
    }
  });

  return newItems;
}
