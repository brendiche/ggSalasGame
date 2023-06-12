import '../assets/maps/maps.css';
import { getAfineTransform } from '../helper';
import { box, boxItem } from '../types';
import { MapConfig, OffsetMap } from './level';

const roomLevelConfigParms: box = {
  height: 385,
  width: 577,
  left: getAfineTransform(180 / 359, -(104172 / 359)),
  top: getAfineTransform(1 / 2, -192),
};

const roomItemsConfigParams: boxItem[] = [
  {
    top: -1,
    left: -1,
    height: 386,
    width: 1,
  },
  {
    top: 43,
    left: -1,
    height: 1,
    width: 579,
  },
  {
    top: 385,
    left: -1,
    height: 1,
    width: 579,
  },
  {
    top: -1,
    left: 578,
    height: 386,
    width: 1,
  },
  {
    height: 76,
    width: 96,
    top: 308,
    left: 0,
  },
  {
    height: 90,
    width: 24,
    top: 134,
    left: 0,
  },
  {
    height: 58,
    width: 30,
    top: 38,
    left: 0,
  },
  {
    height: 59,
    width: 129,
    top: 38,
    left: 224,
  },
  {
    height: 128,
    width: 64,
    top: 256,
    left: 256,
  },
  {
    height: 64,
    width: 22,
    top: 288,
    left: 234,
  },
  {
    height: 61,
    width: 61,
    top: 161,
    left: 417,
  },
  {
    height: 65,
    width: 32,
    top: 287,
    left: 320,
  },
  {
    height: 53,
    width: 94,
    top: 43,
    left: 452,
  },
  {
    height: 73,
    width: 32,
    top: 54,
    left: 544,
  },
  {
    height: 106,
    width: 32,
    top: 278,
    left: 544,
  },
];

export const roomLevelMapConfig: MapConfig = {
  className: 'room',
  box: roomLevelConfigParms,
  items: roomItemsConfigParams,
};

export const charInitialRoomPoss = (offset: OffsetMap) => {
  return {
    colliderBox: {
      height: 32,
      width: 42,
      top: offset.top + 244,
      left: offset.left,
    },
    offset: {
      top: 28,
      left: 10,
    },
  };
};

export const dialogBoxRoom = (offset: OffsetMap) => ({
  height: 100,
  width: 569,
  top: offset.top + 276,
  left: offset.left,
});

export const actionBoxRoom = (offset: OffsetMap) => ({
  height: 50,
  width: 549,
  top: offset.top,
  left: offset.left + 10,
});

const studioLevelConfigParams: box = {
  height: 385,
  width: 449,
  left: getAfineTransform(1 / 2, -225),
  top: getAfineTransform(1 / 2, -192),
};

const studioItemsConfigParams: boxItem[] = [
  {
    top: 46,
    left: 0,
    height: 50,
    width: 450,
  },
  {
    top: 0,
    left: 0,
    height: 384,
    width: 32,
  },
  {
    top: 0,
    left: 256,
    height: 318,
    width: 65,
  },
  {
    top: 290,
    left: 99,
    height: 60,
    width: 60,
  },
  {
    top: 326,
    left: 417,
    height: 58,
    width: 32,
  },
  {
    top: 126,
    left: 321,
    height: 66,
    width: 32,
  },
  {
    top: 116,
    left: 226,
    height: 107,
    width: 32,
  },
  {
    top: 224,
    left: 233,
    height: 64,
    width: 23,
  },
  {
    top: 384,
    left: 0,
    height: 1,
    width: 450,
  },
  {
    top: 0,
    left: 450,
    height: 384,
    width: 1,
  },
];

export const studioLevelMapConfig: MapConfig = {
  className: 'studio',
  box: studioLevelConfigParams,
  items: studioItemsConfigParams,
};

export const charInitialStudioPoss = (offset: OffsetMap) => {
  return {
    coliderBox: {
      height: 32,
      width: 42,
      top: offset.top + 314,
      left: offset.left + 210,
    },
    offset: {
      top: 28,
      left: 10,
    },
  };
};
