export interface Recruiter {
  name: string;
  image: string;
  contact: { mediaIcon: string; url: string }[];
}

export interface RecruitmentData {
  requirements: string[];
  language: string;
  recruiters?: Recruiter[];
  events?: Map<string, string>;
  // timings
}

export interface Alliance {
  tag: string;
  name: string;
  power: number;
  glory?: number;
  recruitment?: RecruitmentData;
}

export interface SvSRecord {
  battleDate: Date;
  prepWin: boolean;
  battleWin: boolean;
  president: string;
  supreme?: boolean;
}
