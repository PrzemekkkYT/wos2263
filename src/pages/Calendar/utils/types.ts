import { Weekday } from "rrule";
import { type DataGroup, type DataItem } from "vis-timeline";
import { z } from "zod";

export interface EventItem extends DataItem {
  iconPath?: string | null;
  imagePath?: string | null;
  description?: string | null;
}

export interface EventGroup extends DataGroup {
  iconPath?: string | null;
  order?: number;
}

const Frequency = new Map<string, number>([
  ["yearly", 0],
  ["monthly", 1],
  ["weekly", 2],
  ["daily", 3],
]);

const WeekdayStrSchema = z.enum(["MO", "TU", "WE", "TH", "FR", "SA", "SU"]);

export const RecurrenceSchema = z.object({
  startDate: z.string().transform((str) => {
    const date = new Date(`${str}T00:00:00Z`);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    return date;
  }),
  frequency: z.string().transform((val) => Frequency.get(val)),
  interval: z.number(),
  days: z
    .array(WeekdayStrSchema.transform((val) => Weekday.fromStr(val)))
    .nullable()
    .optional(),
  untilDate: z
    .string()
    .transform((str) => {
      const date = new Date(`${str}T00:00:00Z`);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date;
    })
    .nullable()
    .optional(),
});

export const TimelineEventSchema = z.object({
  title: z.string(),
  eventId: z.string(),
  durationDays: z.number(),
  itemTitle: z.string().nullish(),
  description: z.string().nullish(),
  color: z
    .string()
    .transform((val) => val.replace(/^C_/, "#"))
    .nullable()
    .optional(),
  itemType: z
    .string()
    .nullable()
    .transform((val) => val ?? "range"),
  recurrenceRules: z.array(RecurrenceSchema).nullish(),
  occurrences: z.array(z.string()).nullish(),
  icon: z
    .object({
      url: z.string(),
    })
    .transform((val) => val.url)
    .nullish(),
});

export const TimelineEventItemSchema = z.object({
  title: z.string(),
  startDate: z.string().transform((str) => {
    const date = new Date(`${str}T00:00:00Z`);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    return date;
  }),
  durationDays: z.number().optional().default(1),
  description: z.string().nullish(),
  color: z
    .string()
    .transform((val) => val.replace(/^C_/, "#"))
    .nullable()
    .optional(),
  itemType: z
    .string()
    .nullable()
    .transform((val) => val ?? "range"),
  parentEvent: z
    .object({ eventId: z.string() })
    .transform((val) => val.eventId),
  icon: z
    .object({
      url: z.string(),
    })
    .transform((val) => val.url)
    .nullish(),
});

const ChildItemSchema = z
  .union([z.object({ eventId: z.string() }), z.object({ groupId: z.string() })])
  .transform((item) => {
    if ("eventId" in item) return item.eventId;
    if ("groupId" in item) return item.groupId;
    return "";
  });

export const GroupSchema = z.object({
  name: z.string(),
  groupId: z.string(),
  color: z
    .string()
    .transform((val) => val.replace(/^C_/, "#"))
    .nullable()
    .optional(),
  children: z.array(ChildItemSchema).default([]),
  icon: z
    .object({
      url: z.string(),
    })
    .transform((val) => val.url)
    .nullish(),
});

export const ApiFetchSchema = z.object({
  timelineEvents: z.array(TimelineEventSchema),
  eventItems: z.array(TimelineEventItemSchema),
  eventGroups: z.array(GroupSchema),
  setting: z
    .object({
      topLevelGroupsOrder: z
        .array(
          z.object({ groupId: z.string() }).transform((val) => val.groupId),
        )
        .default([]),
    })
    .transform((val) => val.topLevelGroupsOrder),
});

export type Group = z.infer<typeof GroupSchema>;
export type Recurrence = z.infer<typeof RecurrenceSchema>;
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;
export type TimelineEventItem = z.infer<typeof TimelineEventItemSchema>;
export type ApiFetch = z.infer<typeof ApiFetchSchema>;
