import type { Alliance } from "@/utils/types";

import discord from "@/assets/logos/discord.svg";

import dhoom from "@/assets/avatars/dhoom.png";
import przemekkk from "@/assets/avatars/przemekkk.png";
import ahmose from "@/assets/avatars/ahmose.png";
import greatLord from "@/assets/avatars/great_lord.jpg";

export const alliances: Alliance[] = [
  {
    tag: "DOL",
    name: "우린우스에돌았어",
    power: 34.2e9,
    glory: 7,
    recruitment: {
      requirements: ["FC7+", "300M+"],
      language: "한국어",
      events: new Map<string, string>([
        ["Bear Trap", "13:00, 14:20"],
        ["Foundry", "12:00, 14:00"],
        ["Canyon", "12:00, 14:00"],
        // ["Crazy Joe", "15:00"],
        // ["Mercenary", "16:00"],
      ]),
    },
  },
  {
    tag: "ONE",
    name: "Great⬩Empire",
    power: 30.6e9,
    recruitment: {
      requirements: ["FC6+", "200M+"],
      language: "All languages",
      recruiters: [
        {
          name: "Dhoom",
          contact: [
            {
              mediaIcon: discord,
              url: "https://discord.com/users/734834012396454039",
            },
          ],
          image: dhoom,
        },
        {
          name: "Przemekkk",
          contact: [
            {
              mediaIcon: discord,
              url: "https://discord.com/users/183242057882664961",
            },
          ],
          image: przemekkk,
        },
      ],
      events: new Map<string, string>([
        ["Bear Trap", "15:00, 19:00"],
        ["Foundry", "14:00, 19:00"],
        ["Canyon", "14:00, 19:00"],
        ["Crazy Joe", "15:00"],
        ["Mercenary", "16:00"],
      ]),
    },
  },
  {
    tag: "HOW",
    name: "House⬩Of⬩Wolves",
    power: 27.8e9,
    recruitment: {
      requirements: ["FC6+", "250M+"],
      language: "English",
      events: new Map<string, string>([
        ["Bear Trap", "12:00, 19:00"],
        ["Foundry", "14:00, 19:00"],
        ["Canyon", "14:00, 19:00"],
        // ["Crazy Joe", "15:00"],
        // ["Mercenary", "16:00"],
      ]),
      recruiters: [
        {
          name: "Great Lord",
          contact: [
            {
              mediaIcon: discord,
              url: "https://discord.com/users/1418430271375540254",
            },
          ],
          image: greatLord,
        },
        {
          name: "Beurnz",
          contact: [
            {
              mediaIcon: discord,
              url: "https://discord.com/users/1334060623428059216",
            },
          ],
          image: ahmose,
        },
      ],
    },
  },
  {
    tag: "Toy",
    name: "뚜비",
    power: 18.7e9,
    recruitment: {
      requirements: ["FC6+", "250M+"],
      language: "English",
      events: new Map<string, string>([
        ["Bear Trap", "12:00, 19:00"],
        ["Foundry", "14:00, 19:00"],
        ["Canyon", "14:00, 19:00"],
        // ["Crazy Joe", "15:00"],
        // ["Mercenary", "16:00"],
      ]),
    },
  },
  {
    tag: "PRO",
    name: "TheProtectors",
    power: 12.1e9,
    recruitment: {
      requirements: ["FC6+", "250M+"],
      language: "English",
      events: new Map<string, string>([
        ["Bear Trap", "12:00, 19:00"],
        ["Foundry", "14:00, 19:00"],
        ["Canyon", "14:00, 19:00"],
        // ["Crazy Joe", "15:00"],
        // ["Mercenary", "16:00"],
      ]),
    },
  },
];
