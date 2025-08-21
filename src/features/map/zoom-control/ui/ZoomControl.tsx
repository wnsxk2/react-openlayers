import { css } from '@emotion/react';
import type { Map } from 'ol';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { colors } from '@/shared/styles';
import { useZoomControl } from '../model/hooks/useZoomControl';
import { ZoomButton } from '@/features/map/zoom-control/ui/ZoomButton';
import { ZoomSlider } from '@/features/map/zoom-control/ui/ZoomSlider';

interface ZoomControlProps {
  mapInstance: Map | null;
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  className?: string;
}

export function ZoomControl({
  mapInstance,
  initialZoom,
  minZoom,
  maxZoom,
  className,
}: ZoomControlProps) {
  const {
    zoom,
    handleZoomChange,
    handleZoomIn,
    handleZoomOut,
    minZoom: min,
    maxZoom: max,
  } = useZoomControl({
    mapInstance,
    initialZoom,
    minZoom,
    maxZoom,
  });

  return (
    <div css={sliderContainer} className={className}>
      <ZoomButton
        icon={<FiMinus />}
        onClick={handleZoomOut}
        disabled={zoom <= min}
      />
      <ZoomSlider zoom={zoom} min={min} max={max} onChange={handleZoomChange} />
      <ZoomButton
        icon={<FiPlus />}
        onClick={handleZoomIn}
        disabled={zoom >= max}
      />
    </div>
  );
}

const sliderContainer = css`
  position: absolute;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  bottom: 15px;
  right: 15px;
  width: 220px;
  height: 40px;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 8px;
  box-shadow: 2px 0 8px ${colors.shadowLight};
  z-index: 100;
  transform: translate(90px, -90px) rotateZ(-90deg);
`;
