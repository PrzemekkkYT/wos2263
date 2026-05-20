import z from "zod";
import { ApiFetchSchema } from "./utils/types";

// TIMELINEEVENTS
// where: {
//       OR: [
//         {AND: [
//           { parentGroup: {} },
//         		{ NOT: {parentGroup: {parentGroup:{}}} }
//           { parentGroup: { groupId_not: "special-events" } },
//         ]},
//         {AND: [
//           { parentGroup: {parentGroup: {}} },
//           { parentGroup: {parentGroup: {groupId_not: "special-events"}} }
//         ]}
//       ]
//     }

// EVENTITEMS
// where: {
//       AND: [
//         { parentEvent: { parentGroup: { groupId_not: "special-events" } } },
//         { parentEvent: { parentGroup: { parentGroup: { groupId_not: "special-events" } } } }
//       ]
//     }

// EVENTGROUPS
// where: {OR: [
//       {AND: [
//         {parentGroup: {}},
//         {parentGroup: {groupId_not: "special-events"}}
//       ]},
//       {NOT: {parentGroup: {}}}
//     ]}

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
    icon {
      url
    }
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
    icon {
      url
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
    icon {
      url
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
    console.error("CMS data validation error:", z.treeifyError(result.error));
    throw new Error("Invalid CMS data structure");
  }

  return {
    timelineEvents: result.data.timelineEvents,
    eventItems: result.data.eventItems,
    eventGroups: result.data.eventGroups,
    setting: result.data.setting,
  };
}
