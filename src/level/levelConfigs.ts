import { getAfineTransform } from "../helper";
import { box, boxItems } from "../types";

export const firstLevelConfigParms:box = {
  height: 385,
  width: 577,
  left: getAfineTransform(180/359, -(104172/359)),
  top: getAfineTransform(1/2, -192),
}

export const itemsConfigParams: boxItems[] = [
  {
    height: 76,
    width: 96,
    top: 308,
    left: 0
  },{
    height: 90,
    width: 24,
    top: 134,
    left: 0
  },{
    height: 58,
    width: 30,
    top: 38,
    left: 0
  },{
    height: 59,
    width: 129,
    top: 38,
    left: 224
  },{
    height: 128,
    width: 64,
    top: 256,
    left: 256
  },{
    height: 64,
    width: 22,
    top: 288,
    left: 234
  },{
    height: 61,
    width: 61,
    top: 161,
    left: 417
  },{
    height: 53,
    width: 94,
    top: 43,
    left: 452
  },{
    height: 73,
    width: 32,
    top: 54,
    left: 544
  },{
    height: 106,
    width: 32,
    top: 278,
    left: 544
  },
]