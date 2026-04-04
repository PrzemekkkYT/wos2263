import type { EventItem, TimelineEvent, TimelineEventItem } from "./types";
import { RRule } from "rrule";
import { addDays } from "../../../utils/utils";

export function findNextOccurrence(
  items: TimelineEvent[],
  eventGroupId: string,
  eventItems?: TimelineEventItem[],
): EventItem | null {
  const now = new Date();

  let timelineEvent = items.find((e) => e.eventId === eventGroupId);

  let evItems = eventItems?.filter(
    (e) =>
      e.parentEvent === eventGroupId && e.startDate.getTime() >= now.getTime(),
  );

  if (timelineEvent === undefined) return null;

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

  let candidates: { rule: RRule | null; nextDate: any; title?: string }[] =
    rules
      .map((rule) => ({
        rule: rule,
        nextDate: rule.after(now),
      }))
      .filter((c): c is { rule: RRule; nextDate: Date } => c.nextDate !== null);

  candidates.push(
    ...(evItems ?? []).map((e) => ({
      rule: null,
      nextDate: e.startDate,
      title: e.title,
    })),
  );

  candidates.push(
    ...(timelineEvent.occurrences ?? [])
      .map((e) => new Date(e))
      .filter((d) => d.getTime() >= now.getTime())
      .map((d) => ({
        rule: null,
        nextDate: d,
      })),
  );

  candidates.sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());

  const winner = candidates[0];

  if (!winner) return null;

  const n =
    winner.rule?.between(winner.rule.options.dtstart, winner.nextDate, true)
      .length || "";

  let newEvent: EventItem = {
    id: `${eventGroupId}-${winner.nextDate.getTime()}`,
    content: winner.title
      ? winner.title
      : timelineEvent.itemTitle
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

export function startCountdown(
  event: EventItem,
  container: HTMLElement,
  title: HTMLElement,
  countdown: HTMLElement,
  createTitle: (eventTitle: string) => string,
  createCountdown: (d: string, h: string, m: string, s: string) => string,
) {
  const countdownInterval = setInterval(() => {
    const nextGenDate = event.start;
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

    if (title) {
      title.textContent = createTitle(event.content);
    }
    if (countdown) {
      // countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      countdown.textContent = createCountdown(days, hours, minutes, seconds);
    }

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      container.textContent = "The event has started!";
    }
  }, 1000);
}
