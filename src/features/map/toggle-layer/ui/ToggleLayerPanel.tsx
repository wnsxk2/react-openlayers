import { getDarkRasterSource } from '@/entities/map';
import type { LayerInfo } from '@/entities/map/model/types';
import { useToggleLayer } from '@/features/map/toggle-layer/model/hooks/useToggleLayer';
import { LayerToggleButton } from '@/features/map/toggle-layer/ui/LayerToggleButton';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';

const DEFAULT_LAYERS: LayerInfo[] = [
  {
    id: 'dark',
    label: '다크 레이어',
    layer: (visible: boolean) =>
      new TileLayer({
        source: getDarkRasterSource(),
        visible,
        opacity: 0.7,
        properties: {
          id: 'dark',
          type: 'toggle',
        },
      }),
  },
];

interface ToggleLayerPanelProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  initialLayers?: LayerInfo[];
}

export const ToggleLayerPanel = ({
  mapInstance,
  isMapReady,
  initialLayers = DEFAULT_LAYERS,
}: ToggleLayerPanelProps) => {
  const { layers, toggleLayer, handleToggleLayer } = useToggleLayer({
    mapInstance,
    isMapReady,
    initialLayers,
  });
  return (
    <div css={contentStyles}>
      <h3 css={titleStyles}>레이어 설정</h3>
      {layers.map(({ id, label }) => (
        <LayerToggleButton
          key={id}
          name={id}
          label={label}
          value={toggleLayer[id] || false}
          onChange={handleToggleLayer}
        />
      ))}
    </div>
  );
};

const contentStyles = css`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const titleStyles = css`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  border-bottom: 1px solid ${colors.borderLight};
  padding-bottom: 12px;
`;
