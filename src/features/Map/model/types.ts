import type TileLayer from 'ol/layer/Tile';

export type MapType = 'normal' | 'satellite' | 'terrain';

export type Layers = {
  normal: TileLayer;
  satellite: TileLayer;
  terrain: TileLayer;
};

export type MapTypeItem = { label: string; type: MapType };
