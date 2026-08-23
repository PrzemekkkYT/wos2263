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
  //   const query = `
  //     query GetAllData {
  //   timelineEvents(first: 1000) {
  //     title
  //     eventId
  //     durationDays
  //     itemTitle
  //     description
  //     color
  //     itemType
  //     recurrenceRules {
  //       ... on RecurrenceRule {
  //         startDate
  //         frequency
  //         interval
  //         days
  //         untilDate
  //       }
  //     }
  //     occurrences
  //     icon {
  //       url
  //     }
  //   }

  //   eventItems(first: 1000) {
  //     title
  //     startDate
  //     durationDays
  //     description
  //     color
  //     itemType
  //     parentEvent {
  //       eventId
  //     }
  //     icon {
  //       url
  //     }
  //   }

  //   eventGroups(orderBy: publishedAt_DESC, first: 1000) {
  //     name
  //     groupId
  //     color
  //     children(first: 1000) {
  //       ... on EventGroup {
  //         groupId
  //       }
  //       ... on TimelineEvent {
  //         eventId
  //       }
  //     }
  //     icon {
  //       url
  //     }
  //   }

  //   setting(where: {settingId: "group-order"}) {
  //     topLevelGroupsOrder {
  //       groupId
  //     }
  //   }
  // }
  //   `;
  const query = `
query GetAllDataFiltered {
  timelineEvents(
    where: {
      AND: [
        {
          OR: [
            { parentGroup: null }
            { parentGroup: { groupId_not: "special-events" } }
          ]
        }
        {
          OR: [
            { parentGroup: null }
            { parentGroup: { parentGroup: null } }
            { parentGroup: { parentGroup: { groupId_not: "special-events" } } }
          ]
        }
      ]
    }
    first: 1000
  ) {
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

  eventItems(
    where: {
      AND: [
        {
          OR: [
            { parentEvent: null }
            { parentEvent: { parentGroup: null } }
            { parentEvent: { parentGroup: { groupId_not: "special-events" } } }
          ]
        }
        {
          OR: [
            { parentEvent: null }
            { parentEvent: { parentGroup: null } }
            { parentEvent: { parentGroup: { parentGroup: null } } }
            { parentEvent: { parentGroup: { parentGroup: { groupId_not: "special-events" } } } }
          ]
        }
      ]
    }
    first: 1000
  ) {
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

  eventGroups(
    where: {
      groupId_not: "special-events"
      AND: [
        {
          OR: [
            { parentGroup: null }
            { parentGroup: { groupId_not: "special-events" } }
          ]
        }
        {
          OR: [
            { parentGroup: null }
            { parentGroup: { parentGroup: null } }
            { parentGroup: { parentGroup: { groupId_not: "special-events" } } }
          ]
        }
      ]
    }
    orderBy: publishedAt_DESC
    first: 1000
  ) {
    name
    groupId
    color
    children(first: 1000) {
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

  setting(where: { settingId: "group-order" }) {
    topLevelGroupsOrder(where: { groupId_not: "special-events" }) {
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

  result.data.eventGroups.push({
    name: "Special Events",
    groupId: "special-events",
    children: [],
  });

  return {
    timelineEvents: result.data.timelineEvents,
    eventItems: result.data.eventItems,
    eventGroups: result.data.eventGroups,
    setting: result.data.setting,
  };
}
