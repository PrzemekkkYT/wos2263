import z from "zod";

// Schematic for SvS Records
const SvSRecordSchema = z.object({
  battleDate: z.string().transform((str) => {
    const date = new Date(`${str}T00:00:00Z`);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    return date;
  }),
  opponent: z.number().nullish(),
  prepWin: z.boolean().nullish(),
  battleWin: z.boolean().nullish(),
  president: z.string().nullish(),
});

// Schematic for Recruiter
const RecruiterSchema = z.object({
  name: z.string(),
  image: z
    .object({
      url: z.string(),
    })
    .transform((val) => val.url)
    .nullish(),
  position: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .nullish(),
  contact: z
    .array(
      z.object({
        socialMedia: z.string(),
        url: z.string(),
      }),
    )
    .nullish()
    .transform((arr) => (arr && arr.length === 0 ? null : arr)),
});

// Schematic for Recruitment
const RecruitmentSchema = z.object({
  language: z.string().nullish(),
  recruiters: z
    .array(RecruiterSchema)
    .nullish()
    .transform((arr) => (arr && arr.length === 0 ? null : arr)),
  requirements: z
    .array(
      z.object({
        requirement: z.string(),
        value: z.string(),
      }),
    )
    .nullish()
    .transform((arr) => (arr && arr.length === 0 ? null : arr)),
  eventTimes: z
    .object({
      bearTrap: z.string().nullish(),
      foundry: z.string().nullish(),
      canyon: z.string().nullish(),
      crazyJoe: z.string().nullish(),
      mercenaryBosses: z.string().nullish(),
    })
    .nullish(),
});

// Schematic for Alliance
const AllianceSchema = z.object({
  tag: z.string(),
  name: z.string(),
  power: z.number().transform((num) => num * 10 ** 9),
  playerCount: z.number(),
  banner: z
    .object({
      url: z.string(),
    })
    .transform((val) => val.url),
  glory: z.number().nullish(),
  recruitment: RecruitmentSchema.nullish(),
});

// Schematic for Settings
const SettingSchema = z.object({
  latestDataUpdate: z
    .string()
    .transform((str) => {
      const date = new Date(str);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date;
    })
    .nullish(),
  authorName: z.string().nullish(),
  version: z.string().nullish(),
  languages: z
    .array(
      z.object({
        nativeName: z.string(),
        localeCode: z.string(),
        flag: z.string(),
        enabled: z.boolean(),
      }),
    )
    .transform((languages) => {
      return languages.reduce<
        Record<string, { nativeName: string; flag: string; enabled: boolean }>
      >((acc, lang) => {
        const { localeCode, ...rest } = lang;
        acc[localeCode] = rest;
        return acc;
      }, {});
    }),
});

export const StateApiFetchSchema = z.object({
  svSRecords: z
    .array(SvSRecordSchema)
    .transform((arr) => (arr && arr.length === 0 ? null : arr)),
  alliances: z
    .array(AllianceSchema)
    .transform((arr) => (arr && arr.length === 0 ? null : arr)),
  setting: SettingSchema,
});

export type StateApiFetch = z.infer<typeof StateApiFetchSchema>;
export type SvSRecord = z.infer<typeof SvSRecordSchema>;
export type Alliance = z.infer<typeof AllianceSchema>;
export type Setting = z.infer<typeof SettingSchema>;
