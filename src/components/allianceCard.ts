import { getBannerUrl } from "@/utils/utils";

export interface AllianceCardData {
  ranking: number;
  tag: string;
  name: string;
  power: string;
}

const template = document.querySelector<HTMLTemplateElement>("#card-template");

export function renderCard(data: AllianceCardData) {
  const clone = template!.content.cloneNode(true) as HTMLElement;

  clone.querySelector(".card-ranking")!.textContent =
    `#${data.ranking.toString().padStart(2, "0")}`;
  clone.querySelector<HTMLImageElement>(".card-banner")!.src = getBannerUrl(
    data.tag,
  );
  clone.querySelector(".card-name")!.textContent = `[${data.tag}] ${data.name}`;
  clone.querySelector(".card-power")!.textContent = data.power;

  document.querySelector("#alliance-card-container")?.appendChild(clone);
}
