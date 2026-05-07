export type HiddenObject = {
  id: string;
  name: string;
  src: string;
  alt: string;
  // position in % so it scales with the image
  xPct: number;
  yPct: number;
  // size in % relative to the image width
  wPct: number;
};
