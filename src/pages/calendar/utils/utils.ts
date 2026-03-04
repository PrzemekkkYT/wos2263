import type { DataSet } from "vis-data";
import type { DataItem } from "vis-timeline";

export function findNextOccurrence(
  items: DataSet<DataItem>,
  eventGroupId: string,
) {
  console.log(items.get());

  const now = new Date();

  // 1. Pobierz wszystkie wystąpienia dla danego ID bazowego (event.eventId)
  // W Twoim kodzie processEvents, pole 'group' w itemie to event.eventId
  const occurrences = items.get({
    filter: (item) => item.group === eventGroupId,
  });

  if (occurrences.length === 0) {
    console.warn("Brak wystąpień dla grupy:", eventGroupId);
    return;
  }

  // 2. Znajdź najbliższe wydarzenie w przyszłości
  const nextEvent = occurrences
    .filter((item) => {
      const start =
        item.start instanceof Date ? item.start : new Date(item.start);
      return start > now;
    })
    .sort((a, b) => {
      const dateA =
        a.start instanceof Date
          ? a.start.getTime()
          : new Date(a.start).getTime();
      const dateB =
        b.start instanceof Date
          ? b.start.getTime()
          : new Date(b.start).getTime();
      return dateA - dateB;
    })[0]; // Bierzemy pierwsze po posortowaniu (najwcześniejsze z przyszłych)

  return nextEvent;
}
