export interface Recruiter {
  name: string;
  image: string;
  contact: { mediaIcon: string; url: string }[];
}

export interface RecruitmentData {
  requirements: Map<string, string>;
  language: string;
  recruiters?: Recruiter[];
  events?: {
    bearTrap?: string;
    foundry?: string;
    canyon?: string;
    crazyJoe?: string;
    mercenary?: string;
  };
  // timings
}

export interface Alliance {
  tag: string;
  name: string;
  power: number;
  playerCount: number;
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
