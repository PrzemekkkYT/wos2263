import type { Recruiter } from "@/utils/types";

import discord from "@/assets/logos/discord.svg";

////////////
//  ONE   //
////////////
import dhoom from "@/assets/avatars/dhoom.png";
import przemekkk from "@/assets/avatars/przemekkk.png";

export const ONERecruiters: Recruiter[] = [
  {
    name: "Dhoom",
    image: dhoom,
    position: {
      x: 730,
      y: 673,
    },
    contact: [
      {
        mediaIcon: discord,
        url: "https://discord.com/users/734834012396454039",
      },
    ],
  },
  {
    name: "Przemekkk",
    image: przemekkk,
    position: {
      x: 723,
      y: 678,
    },
    contact: [
      {
        mediaIcon: discord,
        url: "https://discord.com/users/183242057882664961",
      },
    ],
  },
];

////////////
//  HOW   //
////////////
import ahmose from "@/assets/avatars/ahmose.png";
import greatLord from "@/assets/avatars/great_lord.jpg";

export const HOWRecruiters: Recruiter[] = [
  {
    name: "Great Lord",
    image: greatLord,
  },
  {
    name: "Beurnz",
    image: ahmose,
    position: {
      x: 735,
      y: 568,
    },
  },
];

////////////
//  PRO   //
////////////
export const PRORecruiters: Recruiter[] = [
  {
    name: "༺꧁༒ᴾᴿᴼFreyja༒꧂༻",
    position: {
      x: 758,
      y: 473,
    },
  },
];
