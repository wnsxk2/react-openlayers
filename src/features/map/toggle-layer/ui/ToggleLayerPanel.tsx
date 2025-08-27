import { getDarkRasterSource, type LayerInfo } from '@/entities/map';
import {
  useToggleLayer,
  useGetPolygon,
  LayerToggleButton,
} from '@/features/map/toggle-layer';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { useEffect, useState } from 'react';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

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
  const { data: polygon } = useGetPolygon();
  const [currentLayers, setCurrentLayers] =
    useState<LayerInfo[]>(initialLayers);

  useEffect(() => {
    if (polygon) {
      setCurrentLayers([
        {
          id: 'polygon',
          label: '폴리곤 레이어',
          layer: (visible: boolean) =>
            new VectorLayer({
              source: new VectorSource({
                features: new GeoJSON().readFeatures(polygon, {
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857',
                }),
              }),
              style: new Style({
                fill: new Fill({
                  color: 'rgba(255, 0, 0, 0.2)', // 반투명 빨강
                }),
                stroke: new Stroke({
                  color: '#ff0000', // 빨강
                  width: 2,
                }),
              }),
              visible,
              opacity: 0.7,
              zIndex: 1,
              properties: {
                id: 'polygon',
                type: 'toggle',
              },
            }),
        },
        ...currentLayers,
      ]);
    }
  }, [polygon]);
  const { layers, toggleLayer, handleToggleLayer } = useToggleLayer({
    mapInstance,
    isMapReady,
    initialLayers: currentLayers,
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
