import { AdjacentStr } from "../type";

export function getAdjacentStr(adjacentNum: Number): AdjacentStr {
  switch (adjacentNum) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    default:
      return "fourplus";
  }
}
