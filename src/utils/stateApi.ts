import z from "zod";
import { signal } from "@preact/signals";

import { StateApiFetchSchema, type StateApiFetch } from "@/utils/types";

export const apiData = signal<StateApiFetch | null>(null);

export function fetchStateData() {
  runStateApiFetch().then((data) => {
    console.log(data);
    apiData.value = data;
  });
}

export async function runStateApiFetch() {
  const query = `
    query GetStateData {
      svSRecords(orderBy: battleDate_DESC, first: 100) {
          opponent
          battleDate
          prepWin
          battleWin
          president
      }

      alliances(orderBy: power_DESC) {
        tag
        name
        power
        playerCount
        banner {
          url
        }
        glory
        recruitment {
          language
          recruiters {
            name
            image {
              url
            }
            position {
              x
              y
            }
            contact {
              socialMedia
              url
            }
          }
          eventTimes {
            bearTrap
            foundry
            canyon
            crazyJoe
            mercenaryBosses
          }
          requirements {
            requirement
            value
          }
        }
      }
      
      setting(where: {settingId: "main-setting"}) {
        latestDataUpdate
        authorName
        version
        languages {
          nativeName
          localeCode
          flag
          enabled
        }
      }
    }
  `;

  const response = await fetch(
    "https://eu-west-2.cdn.hygraph.com/content/cmn60eftv004o08uuefx0rg3c/master",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    },
  );

  const { data } = await response.json();

  const result = StateApiFetchSchema.safeParse(data);

  if (!result.success) {
    console.error("CMS data validation error:", z.treeifyError(result.error));
    throw new Error("Invalid CMS data structure");
  }

  return result.data;
}
