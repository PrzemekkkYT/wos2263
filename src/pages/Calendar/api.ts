import z from "zod";
import { ApiFetchSchema } from "./utils/types";

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
            itemType
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
        startDate
        durationDays
        description
        color
        itemType
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

  const result = ApiFetchSchema.safeParse(data);

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
    timelineEvents: result.data.timelineEvents,
    eventItems: result.data.eventItems,
    eventGroups: result.data.eventGroups,
    setting: result.data.setting,
  };
}
