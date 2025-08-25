import { BaseLayerSelector } from '@/features/map/base-layer-select';
import { ToggleLayerPanel } from '@/features/map/toggle-layer';
import { MapToggleMenu } from '@/features/map/toggle-menu';
import { ZoomControl } from '@/features/map/zoom-control';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { useEffect, useRef, useState } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const DEFAULT_ZOOM = 12;

export default function MapPage() {
  // sidebar
  const [isSiderbarOpen, setSidebarOpen] = useState(true);

  const onToggleSidebar = () => setSidebarOpen((prev) => !prev);

  // map
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // div 연결 확인 & 이미 map이 초기화 되었다면 재실행 x
    if (!mapRef.current || mapInstance.current) return;

    // map 초기화
    mapInstance.current = new Map({
      // map을 표출할 element
      target: mapRef.current,
      controls: [],
      layers: [],
      view: new View({
        center: fromLonLat([126.9779, 37.5663]),
        zoom: DEFAULT_ZOOM,
      }),
    });

    // map 인스턴스 할당 완료 플래그 설정
    setIsMapReady(true);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
        setIsMapReady(false);
      }
    };
  }, []);

  return (
    <div css={layoutStyles}>
      <aside css={[sidebarStyles, !isSiderbarOpen && hideSidebarStyles]}>
        <ToggleLayerPanel
          mapInstance={mapInstance.current}
          isMapReady={isMapReady}
        />
        <button css={toggleButtonStyles} onClick={onToggleSidebar}>
          {isSiderbarOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
        </button>
      </aside>
      <main css={mainStyles({ isOpen: isSiderbarOpen })}>
        <section css={mapContainerStyles} ref={mapRef}>
          <BaseLayerSelector
            mapInstance={mapInstance.current}
            isMapReady={isMapReady}
            initialLayer={'normal'}
          />
          <ZoomControl
            mapInstance={mapInstance.current}
            isMapReady={isMapReady}
          />
        </section>

        <MapToggleMenu
          position={css`
            top: 15px;
            right: 15px;
          `}
        />
      </main>
    </div>
  );
}

// main
const layoutStyles = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

// sidebar
const sidebarStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: ${colors.backgroundLight};
  border-right: 1px solid ${colors.borderLight};
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;

const hideSidebarStyles = css`
  transform: translateX(-100%);
`;

const mainStyles = ({ isOpen }: { isOpen: boolean }) => css`
  display: flex;
  flex: 1;
  min-height: 100vh;
  position: relative;
  background-color: ${colors.backgroundLight};
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${isOpen ? '280px' : '0px'};
`;

const toggleButtonStyles = css`
  position: fixed;
  top: 50%;
  width: 30px;
  height: 60px;
  background-color: ${colors.backgroundLight};
  border: 1px solid ${colors.borderLight};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${colors.textSecondary};
  z-index: 1001;
  transform: translate(280px, -50%);
  transition: transform 0.3s ease-in-out, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px ${colors.shadowLight};
`;

// map
const mapContainerStyles = css`
  width: 100%;
  height: 100%;
`;
