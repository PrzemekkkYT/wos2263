export function notEmptyArray(obj: any) {
  return Array.isArray(obj) && obj.length;
}

export function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function isDateBetween(d: Date, start: Date, end: Date) {
  return d.getTime() > start.getTime() && d.getTime() < end.getTime();
}

export function getEventIconUrl(iconName: string) {
  return new URL(`../assets/event_icons/${iconName}.png`, import.meta.url).href;
}

export function getImageUrl(iconName: string) {
  return new URL(`../assets/images/${iconName}.png`, import.meta.url).href;
}

export function getBannerUrl(allianceTag: string) {
  return new URL(`../assets/banners/${allianceTag}.png`, import.meta.url).href;
}
