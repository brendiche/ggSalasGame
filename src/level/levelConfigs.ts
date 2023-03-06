import { getAfineTransform } from "../helper";
import { box } from "../types";

export const firstLevelConfigParms:box = {
  height: 385,
  width: 577,
  left: getAfineTransform(180/359, -(104172/359)),
  top: getAfineTransform(1/2, -192),
}