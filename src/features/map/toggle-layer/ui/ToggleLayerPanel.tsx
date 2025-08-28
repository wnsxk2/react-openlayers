import type { LayerInfo } from '@/entities/map';
import { LayerToggleButton } from '@/features/map/toggle-layer/ui/LayerToggleButton';
import { useLayerManager } from '@/features/map/toggle-layer/model/hooks/useLayerManager';
import { useMapClickHandler } from '@/features/map/toggle-layer/model/hooks/useMapClickHandler';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { Map } from 'ol';

interface ToggleLayerPanelProps {
  mapInstance: Map | null;
  isMapReady: boolean;
  defaultLayers?: LayerInfo[];
}

export const ToggleLayerPanel = ({
  mapInstance,
  isMapReady,
  defaultLayers,
}: ToggleLayerPanelProps) => {
  // 레이어 관리 (polygon 데이터 조회 포함)
  const { layers, toggleState, toggleLayer } = useLayerManager({
    mapInstance,
    isMapReady,
    defaultLayers,
  });

  // 맵 클릭 이벤트 처리
  useMapClickHandler({
    mapInstance,
    isMapReady,
    enabled: true,
  });

  return (
    <div css={contentStyles}>
      <h3 css={titleStyles}>레이어 설정</h3>
      {layers.map(({ id, label }) => (
        <LayerToggleButton
          key={id}
          name={id}
          label={label}
          value={toggleState[id] || false}
          onChange={toggleLayer}
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
