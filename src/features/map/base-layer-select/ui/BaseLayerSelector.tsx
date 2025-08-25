import { getBaseLayerSource } from '@/entities/map';
import useBaseLayer from '@/features/map/base-layer-select/model/hooks/useBaseLayer';
import { BaseLayerItem } from '@/features/map/base-layer-select/ui/BaseLayerItem';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { Map } from 'ol';
import type Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';

const DEFAULT_LAYERS = [
  {
    id: 'normal',
    label: '일반',
    layer: (select: string) =>
      new TileLayer({
        source: getBaseLayerSource('normal'),
        visible: select === 'normal',
        properties: {
          type: 'base',
          id: 'normal',
        },
      }),
  },
  {
    id: 'satellite',
    label: '위성',
    layer: (select: string) =>
      new TileLayer({
        source: getBaseLayerSource('satellite'),
        visible: select === 'satellite',
        properties: {
          type: 'base',
          id: 'satellite',
        },
      }),
  },
  {
    id: 'terrain',
    label: '지형',
    layer: (select: string) =>
      new TileLayer({
        source: getBaseLayerSource('terrain'),
        visible: select === 'terrain',
        properties: {
          type: 'base',
          id: 'terrain',
        },
      }),
  },
];

interface BaseLayerSelectorProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  initialLayer: string;
  initialLayers?: {
    id: string;
    label: string;
    layer: (select: string) => Layer;
  }[];
}

export const BaseLayerSelector = ({
  mapInstance,
  isMapReady,
  initialLayer = 'normal',
  initialLayers = DEFAULT_LAYERS,
}: BaseLayerSelectorProps) => {
  const { layers, selectLayer, handleSelectLayer } = useBaseLayer({
    mapInstance,
    isMapReady,
    initialLayer,
    initialLayers,
  });

  return (
    <div css={baseLayerSelector}>
      {layers.map(({ id, label }) => (
        <BaseLayerItem
          key={id}
          label={label}
          selected={id === selectLayer}
          onClick={() => {
            handleSelectLayer(id);
          }}
        />
      ))}
    </div>
  );
};

const baseLayerSelector = css`
  top: 15px;
  left: 15px;

  display: flex;
  flex-direction: row;
  z-index: 100;
  padding: 5px;
  gap: 5px;
  position: absolute;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 8px;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;
