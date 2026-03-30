import { getBannerUrl } from "@/utils/utils";

class AllianceCard extends HTMLElement {
  connectedCallback() {
    const pos = this.getAttribute("pos");
    const tag = this.getAttribute("tag")?.toLowerCase();
    const name = this.getAttribute("name");
    const power = this.getAttribute("power");

    this.innerHTML = `
        <div class="bg-slate-800/50 p-6 md:p-4 rounded-xl border border-slate-500/30 transition-colors">
          <div class="flex justify-between items-start mb-4">
            <span class="font-headline text-sky-400 font-bold">${pos}</span>
            <img src="${getBannerUrl(tag || "")}" alt="${tag}" class="w-12" />
          </div>
          <h4 class="font-headline font-bold">${name}</h4>
          <p class="text-gray-400 font-headline text-sm">${power} Power</p>
        </div>
    `;
  }
}

customElements.define("alliance-card", AllianceCard);
