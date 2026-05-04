// import { useEffect, useState } from "preact/hooks";
// import type { StateApiFetch } from "./types";
// import { fetchStateData } from "@/utils/stateApi";

// export function useStateApi() {
//   const [apiData, setApiData] = useState<StateApiFetch | null>(null);

//   useEffect(() => {
//     fetchStateData().then((data) => {
//       console.log(data);
//       setApiData(data);
//     });
//   }, []);

//   return apiData;
// }
