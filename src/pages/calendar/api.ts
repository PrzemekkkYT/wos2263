import z from "zod";
import {
  TimelineEventSchema,
  GroupSchema,
  TimelineEventItemSchema,
} from "./types";

export async function fetchApiData() {
  const query = `
    query GetAllData {
      timelineEvents(first: 100) {
            title
            eventId
            durationDays
            itemTitle
            description
            color
            recurrenceRules {
              ... on RecurrenceRule {
                  startDate
                  frequency
                  interval
                  days
                  untilDate
              }
            }
            occurrences
        }

      eventItems(first: 100) {
        title
        durationDays
        description
        color
        parentEvent {
          eventId
        }
      }

      eventGroups(orderBy: publishedAt_DESC, first: 100) {
        name
        groupId
        color
        children(first: 100) {
          ... on EventGroup {
            groupId
          }
          ... on TimelineEvent {
            eventId
          }
        }
      }

      setting(where: {settingId: "group-order"}) {
        topLevelGroupsOrder {
          groupId
        }
      }
    }
  `;

  const response = await fetch(
    "https://eu-west-2.cdn.hygraph.com/content/cmlqsiu2m006807un518dyjkw/master",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    },
  );
  const { data } = await response.json();

  const schema = z.object({
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

  console.log(data);

  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Błąd walidacji danych z CMS:", z.treeifyError(result.error));
    throw new Error("Invalid CMS data structure");
  }

  // return [
  //   result.data.timelineEvents as TimelineEvent[],
  //   result.data.eventGroups as Group[],
  //   result.data.setting,
  // ];
  return {
    items: result.data.timelineEvents,
    groups: result.data.eventGroups,
    groupOrderSetting: result.data.setting,
  };
}
