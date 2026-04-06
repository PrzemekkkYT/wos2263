export interface Alliance {
  tag: string;
  name: string;
  power: number;
  glory?: number;
}

export interface SvSRecord {
  battleDate: Date;
  prepWin: boolean;
  battleWin: boolean;
  president: string;
  supreme?: boolean;
}
