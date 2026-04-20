export interface Recruiter {
  name: string;
  image?: string;
  position?: { x: number; y: number };
  contact?: { mediaIcon: string; url: string }[];
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
  opponent: string;
  prepWin?: boolean;
  battleWin?: boolean;
  battleDate: Date;
  president?: string;
  supreme?: boolean;
}
