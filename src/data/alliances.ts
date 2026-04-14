import type { Alliance } from "@/utils/types";
import { ONERecruiters, HOWRecruiters } from "./recruiters";

export const alliances: Alliance[] = [
  {
    tag: "DOL",
    name: "우린우스에돌았어",
    power: 34.6e9,
    playerCount: 81,
    glory: 7,
    recruitment: {
      requirements: new Map<string, string>([
        ["FC Level", "FC7+"],
        ["Minimum Power", "300M+"],
      ]),
      language: "한국어",
      events: {
        bearTrap: "13:00, 14:20",
        foundry: "12:00, 14:00",
        canyon: "12:00, 14:00",
        // crazyJoe: "15:00",
        // mercenary: "16:00",
      },
    },
  },
  {
    tag: "ONE",
    name: "Great⬩Empire",
    power: 32.7e9,
    playerCount: 96,
    recruitment: {
      requirements: new Map<string, string>([
        ["FC Level", "FC6+"],
        ["Minimum Power", "200M+"],
      ]),
      language: "All languages",
      recruiters: ONERecruiters,
      events: {
        bearTrap: "15:00, 19:00",
        foundry: "14:00, 19:00",
        canyon: "14:00, 19:00",
        crazyJoe: "15:00",
        mercenary: "16:00",
      },
    },
  },
  {
    tag: "HOW",
    name: "House⬩Of⬩Wolves",
    power: 29.8e9,
    playerCount: 93,
    recruitment: {
      requirements: new Map<string, string>([
        ["FC Level", "FC6+"],
        ["Minimum Power", "250M+"],
      ]),
      language: "English",
      events: {
        bearTrap: "12:00, 19:00",
        foundry: "14:00, 19:00",
        canyon: "14:00, 19:00",
        // crazyJoe: "15:00",
        // mercenary: "16:00",
      },
      recruiters: HOWRecruiters,
    },
  },
  {
    tag: "Toy",
    name: "뚜비",
    power: 19.2e9,
    playerCount: 92,
    recruitment: {
      requirements: new Map<string, string>([
        ["FC Level", "FC6+"],
        ["Minimum Power", "250M+"],
      ]),
      language: "English",
      events: {
        bearTrap: "12:00, 19:00",
        foundry: "14:00, 19:00",
        canyon: "14:00, 19:00",
        // crazyJoe: "15:00",
        // mercenary: "16:00",
      },
    },
  },
  {
    tag: "PRO",
    name: "TheProtectors",
    power: 11.8e9,
    playerCount: 63,
    recruitment: {
      requirements: new Map<string, string>([
        ["FC Level", "FC6+"],
        ["Minimum Power", "250M+"],
      ]),
      language: "English",
      events: {
        bearTrap: "12:00, 19:00",
        foundry: "14:00, 19:00",
        canyon: "14:00, 19:00",
        // crazyJoe: "15:00",
        // mercenary: "16:00",
      },
    },
  },
];
