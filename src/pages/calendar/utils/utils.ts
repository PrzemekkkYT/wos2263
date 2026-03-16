import type { EventItem, TimelineEvent } from "./types";
import { RRule } from "rrule";
import { addDays } from "../../../utils/utils";

export function findNextOccurrence(
  items: TimelineEvent[],
  eventGroupId: string,
) {
  let timelineEvent = items.find((e) => e.eventId === eventGroupId);

  if (timelineEvent === undefined) return;

  let rules =
    timelineEvent?.recurrenceRules?.map(
      (req) =>
        new RRule({
          freq: req.frequency,
          interval: req.interval,
          byweekday: req.days,
          dtstart: req.startDate,
          wkst: RRule.MO,
          until: req.untilDate,
        }),
    ) || [];

  const now = new Date();

  let candidates = rules
    .map((rule) => ({
      rule: rule,
      nextDate: rule.after(now),
    }))
    .filter((c): c is { rule: RRule; nextDate: Date } => c.nextDate !== null);

  candidates.sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());

  const winner = candidates[0];

  const n = winner.rule.between(
    winner.rule.options.dtstart,
    winner.nextDate,
    true,
  ).length;

  let newEvent: EventItem = {
    id: `${eventGroupId}-${winner.nextDate.getTime()}`,
    content: timelineEvent.itemTitle
      ? timelineEvent.itemTitle.replaceAll("{n}", `${n}`)
      : timelineEvent.title,
    start: winner.nextDate,
    end: addDays(winner.nextDate, timelineEvent.durationDays),
    style: `background-color: ${timelineEvent.color}`,
    group: timelineEvent.eventId,
    description: timelineEvent.description,
  };

  return newEvent;
}
