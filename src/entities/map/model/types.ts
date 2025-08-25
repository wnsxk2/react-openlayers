import type Layer from 'ol/layer/Layer';

export type LayerInfo = {
  id: string;
  label: string;
  layer: (visible: boolean) => Layer;
};
