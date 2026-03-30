import "../../styles/shared.css";
import "./style.css";

import { type AllianceCardData, renderCard } from "@/components/allianceCard";

const alliances: AllianceCardData[] = [
  { ranking: 2, tag: "ONE", name: "Great⬩Empire", power: "29.1B" },
  { ranking: 3, tag: "HOW", name: "HouseOfWolves", power: "28.0B" },
  { ranking: 4, tag: "ToY", name: "뚜비", power: "17.3B" },
  { ranking: 5, tag: "PRO", name: "TheProtectors", power: "12.1B" },
];

alliances.forEach((alliance) => {
  renderCard(alliance);
});

// <alliance-card
//               class="h-full"
//               pos="#02"
//               tag="ONE"
//               name="[ONE] Great⬩Empire"
//               power="29.1B"
//             ></alliance-card>
//             <alliance-card
//               pos="#03"
//               tag="HOW"
//               name="[HOW] HouseOfWolves"
//               power="28.0B"
//             ></alliance-card>
//             <alliance-card
//               pos="#04"
//               tag="ToY"
//               name="[ToY] 뚜비"
//               power="17.3B"
//             ></alliance-card>
//             <alliance-card
//               pos="#05"
//               tag="PRO"
//               name="[PRO] TheProtectors"
//               power="12.1B"
//             ></alliance-card>
