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
  disabled?: boolean;
}

export const ToggleLayerPanel = ({
  mapInstance,
  isMapReady,
  defaultLayers,
  disabled = false,
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
      <div css={disabledStyles(disabled)} />
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
  overflow-y: auto;
  position: relative;
`;

const disabledStyles = (disabled: boolean) => css`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${disabled ? 'block' : 'none'};
  background-color: ${colors.backgroundDark};
  opacity: 0.4;
  transition: all 0.3s ease-in-out;
`;

const titleStyles = css`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  border-bottom: 1px solid ${colors.borderLight};
  padding-bottom: 12px;
`;
