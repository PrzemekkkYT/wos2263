import type { Alliance } from "@/utils/types";
import { ONERecruiters, HOWRecruiters, PRORecruiters } from "./recruiters";

export const alliances: Alliance[] = [
  {
    tag: "DOL",
    name: "우린우스에돌았어",
    power: 34.6e9,
    playerCount: 80,
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
    power: 34.9e9,
    playerCount: 100,
    recruitment: {
      recruiters: ONERecruiters,
      requirements: new Map<string, string>([
        ["FC Level", "FC6+"],
        ["Minimum Power", "200M+"],
      ]),
      language: "All languages",
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
    power: 28.8e9,
    playerCount: 90,
    recruitment: {
      recruiters: HOWRecruiters,
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
    tag: "Toy",
    name: "뚜비",
    power: 19.4e9,
    playerCount: 91,
    recruitment: {
      requirements: new Map<string, string>([
        ["FC Level", "FC6+"],
        ["Minimum Power", "250M+"],
      ]),
      language: "한국어",
      events: {
        bearTrap: "12:00, 16:00",
        foundry: "12:00",
        canyon: "12:00",
        // crazyJoe: "15:00",
        // mercenary: "16:00",
      },
    },
  },
  {
    tag: "PRO",
    name: "TheProtectors",
    power: 12.3e9,
    playerCount: 64,
    recruitment: {
      recruiters: PRORecruiters,
      requirements: new Map<string, string>([
        ["FC Level", "FC6+"],
        ["Minimum Power", "250M+"],
      ]),
      language: "English",
      events: {
        bearTrap: "02:00, 21:00",
        foundry: "19:00, 21:00",
        canyon: "19:00, 21:00",
        // crazyJoe: "15:00",
        // mercenary: "16:00",
      },
    },
  },
];
