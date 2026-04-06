import G1 from "@/assets/icons/glory1.png";
import G2 from "@/assets/icons/glory2.png";
import G3 from "@/assets/icons/glory3.png";

export function getGloryIcons(totalPoints: number): string[] {
  const icons: string[] = [];

  // 1. Obliczamy ile mamy "piątek piątek" (czyli 25 pkt = glory3)
  const g3Count = Math.floor(totalPoints / 25);
  let remainder = totalPoints % 25;

  // 2. Obliczamy ile zostało "piątek" (5 pkt = glory2)
  const g2Count = Math.floor(remainder / 5);
  remainder = remainder % 5;

  // 3. Reszta to pojedyncze punkty (1 pkt = glory1)
  const g1Count = remainder;

  // Wypychamy odpowiednią ilość ścieżek do tablicy
  for (let i = 0; i < g3Count; i++) icons.push(G3);
  for (let i = 0; i < g2Count; i++) icons.push(G2);
  for (let i = 0; i < g1Count; i++) icons.push(G1);

  return icons;
}

// src/utils/formatHelpers.ts
export function formatPower(power: number): string {
  if (power >= 1_000_000_000) {
    return (power / 1_000_000_000).toFixed(1) + "B";
  }
  if (power >= 1_000_000) {
    return (power / 1_000_000).toFixed(1) + "M";
  }
  return power.toLocaleString();
}
