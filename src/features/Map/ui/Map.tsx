import MapSelector from '@/features/Map/ui/MapSelector';
import { css } from '@emotion/react';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { colors } from '@/shared/styles';
import ZoomSlider from 'ol/control/ZoomSlider';
import Zoom from 'ol/control/Zoom';
import { useMapContext } from '@/entities/map/model/useMapContext';

export default function Map({ children }: PropsWithChildren) {
  const {
    mapRef,
    mapType,
    setMapType,
    mapInstance,
    isMapReady,
    isDarkRasterVisible,
  } = useMapContext();
  const zoomSliderControlRef = useRef<ZoomSlider | null>(null);
  const zoomControlRef = useRef<Zoom | null>(null);
  const [scaleText, setScaleText] = useState<string>('');

  useEffect(() => {
    if (!mapInstance || !isMapReady) return;

    if (!zoomSliderControlRef.current) {
      const zoomSliderControl = new ZoomSlider({ duration: 200 });
      mapInstance.addControl(zoomSliderControl);
      zoomSliderControlRef.current = zoomSliderControl;
    }

    if (!zoomControlRef.current) {
      const zoomControl = new Zoom({ zoomInLabel: '+', zoomOutLabel: '-' });
      mapInstance.addControl(zoomControl);
      zoomControlRef.current = zoomControl;
    }

    const updateScale = () => {
      const view = mapInstance.getView();
      const resolution = view?.getResolution();
      if (!resolution) return;

      const distance = resolution * 100;

      if (distance >= 1000) {
        setScaleText(`${(distance / 1000).toFixed(1)}km`);
      } else {
        setScaleText(`${Math.round(distance)}m`);
      }
    };

    updateScale();
    mapInstance.getView()?.on('change:resolution', updateScale);

    return () => {
      if (zoomSliderControlRef.current && mapInstance) {
        mapInstance.removeControl(zoomSliderControlRef.current);
        zoomSliderControlRef.current = null;
      }
      if (zoomControlRef.current && mapInstance) {
        mapInstance.removeControl(zoomControlRef.current);
        zoomControlRef.current = null;
      }
      mapInstance.getView()?.un('change:resolution', updateScale);
    };
  }, [mapInstance, isMapReady]);

  return (
    <div css={mapWrapper(isDarkRasterVisible)}>
      <MapSelector
        mapType={mapType}
        setMap={setMapType}
        customCSS={mapTypeSelector}
      />
      <div css={mapElement} ref={mapRef} />
      <div className='scale-display'>{scaleText}</div>
      {children}
    </div>
  );
}

const mapWrapper = (isDarkRasterVisible: boolean) => css`
  overflow: hidden;
  flex: 1;
  position: relative;

  .ol-zoom {
    position: absolute !important;
    bottom: 230px;
    right: 20px;
    top: unset !important;
    left: unset !important;
    z-index: 101;
    display: flex;
    flex-direction: column;
  }
  .ol-zoom button {
    background-color: ${colors.white};
    border: 1px solid ${colors.borderLight};
    width: 30px;
    height: 30px;
    font-size: 16px;
    font-weight: bold;
    color: ${colors.gray700};

    &:hover {
      background-color: ${colors.gray50};
    }
  }

  .ol-zoom .ol-zoom-in {
    border-radius: 4px 4px 0 0;
    border-bottom: none;
  }

  .ol-zoom .ol-zoom-out {
    position: absolute !important;
    bottom: -179px;
    right: 0;
    border-radius: 0 0 4px 4px;
    border-top: none;
  }

  .ol-zoomslider {
    position: absolute !important;
    bottom: 80px;
    right: 20px;
    top: unset !important;
    left: unset !important;
    z-index: 100;
    background-color: ${colors.white};
    border: 1px solid ${colors.borderLight};
    border-radius: 2px;
    border-top: none;
    padding: 0;
    width: 30px;
    height: 150px;
    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 8px;
      bottom: 8px;
      width: 2px;
      transform: translateX(-50%);
      background-color: ${colors.gray300};
      border-radius: 1px;
    }

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 8px;
      bottom: 8px;
      width: 12px;
      transform: translateX(-50%);
      background-image: repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent 13px,
        ${colors.gray400} 13px,
        ${colors.gray400} 14px,
        transparent 14px,
        transparent 16.4px
      );
      pointer-events: none;
    }
  }
  .ol-zoomslider-thumb {
    background-color: ${colors.buttonFocus};
    border: 1px solid ${colors.borderLight};
    width: 24px;
    height: 15px;
    border-radius: 2px;
    cursor: grab;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .scale-display {
    position: absolute;
    bottom: 20px;
    right: 8px;
    //background-color: ${colors.white};
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 500;
    color: ${isDarkRasterVisible ? colors.white : colors.gray800};
    text-align: center;
    border-bottom: 2px solid
      ${isDarkRasterVisible ? colors.gray200 : colors.gray600};
  }
`;

const mapElement = css`
  width: 100%;
  height: 100%;
`;

const mapTypeSelector = css`
  top: 15px;
  left: 15px;
`;
