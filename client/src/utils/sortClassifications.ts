import { IData } from "../pages/Home";

export function sortClassifications(results: IData) {
  const sortedItems = Object.fromEntries(
    Object.entries(results).sort((a, b) => b[1] - a[1])
  );
  
  return sortedItems;
}
