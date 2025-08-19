import type TileLayer from 'ol/layer/Tile';
import type { XYZ } from 'ol/source';

export type MapType = 'normal' | 'satellite' | 'terrain';

export type Layers = {
  normal: TileLayer;
  satellite: TileLayer;
  terrain: TileLayer;
  //darkRaster?: TileLayer<XYZ>;
};

export type OverlayLayers = {
  darkRaster: TileLayer<XYZ>;
};

export type MapTypeItem = { label: string; type: string };
