import { getBaseLayerSource, getDarkRasterSource } from '@/entities/map';
import { MapToggleMenu } from '@/features/map/toggle-menu';
import { ZoomControl } from '@/features/map/zoom-control';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import { Map, View } from 'ol';
import type Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
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
  const [baseLayers, setBaseLayers] = useState<
    Record<string, { order: number; label: string; type: string; layer: Layer }>
  >({});
  const [optionalLayers, setOptionalLayers] = useState<
    Record<string, { order: number; label: string; type: string; layer: Layer }>
  >({});
  const [selectedBaseLayer, setSelectedBaseLayer] = useState<string>('normal');
  const [checkedOptionalLayer, setCheckedOptionalLayer] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // div 연결 확인 & 이미 map이 초기화 되었다면 재실행 x
    if (!mapRef.current || mapInstance.current) return;

    const normalLayer = new TileLayer({
      source: getBaseLayerSource('normal'),
      visible: selectedBaseLayer === 'normal',
    });

    const satelliteLayer = new TileLayer({
      source: getBaseLayerSource('satellite'),
      visible: selectedBaseLayer === 'satellite',
    });

    const terrainLayer = new TileLayer({
      source: getBaseLayerSource('terrain'),
      visible: selectedBaseLayer === 'terrain',
    });

    const darkLayer = new TileLayer({
      source: getDarkRasterSource(),
      visible: false,
      opacity: 0.7,
    });

    // layer 초기화
    setBaseLayers({
      normal: {
        order: 1,
        label: '일반',
        type: 'normal',
        layer: normalLayer,
      },
      satellite: {
        order: 3,
        label: '위성',
        type: 'satellite',
        layer: satelliteLayer,
      },
      terrain: {
        order: 2,
        label: '지형',
        type: 'terrain',
        layer: terrainLayer,
      },
    });

    setOptionalLayers({
      dark: {
        order: 1,
        label: '다크 레이어',
        type: 'dark',
        layer: darkLayer,
      },
    });

    // map 초기화
    mapInstance.current = new Map({
      // map을 표출할 element
      target: mapRef.current,
      controls: [],
      layers: [normalLayer, satelliteLayer, terrainLayer, darkLayer],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectBaseLayer = (type: string) => {
    if (!mapInstance.current) return;
    setSelectedBaseLayer(type);

    // 모든 레이어를 숨김
    Object.values(baseLayers).forEach(({ layer }) => {
      layer.setVisible(false);
    });

    // 선택된 레이어만 표시
    baseLayers[type].layer.setVisible(true);
  };

  const onCheckedOptionalLayer = (type: string, isChecked: boolean) => {
    if (!mapInstance.current) return;
    setCheckedOptionalLayer((prev) => {
      return {
        ...prev,
        [type]: isChecked,
      };
    });

    // 선택된 레이어 업데이트
    optionalLayers[type].layer.setVisible(isChecked);
  };

  return (
    <div css={layoutStyles}>
      <aside css={[sidebarStyles, !isSiderbarOpen && hideSidebarStyles]}>
        <div css={menuContentStyles}>
          <h3 css={slideMenuTitle}>레이어 설정</h3>
          {Object.values(optionalLayers)
            .sort((a, b) => a.order - b.order)
            .map(({ label, type }) => {
              return (
                <div key={type} css={layerCheckSection}>
                  <label css={checkboxLabel}>
                    <input
                      type='checkbox'
                      checked={checkedOptionalLayer[type] || false}
                      onChange={(e) => {
                        onCheckedOptionalLayer(type, e.target.checked);
                      }}
                      css={layersCheckbox}
                    />
                    <span css={checkboxText}>{label}</span>
                  </label>
                </div>
              );
            })}
        </div>
        <button css={toggleButtonStyles} onClick={onToggleSidebar}>
          {isSiderbarOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
        </button>
      </aside>
      <main css={mainStyles({ isOpen: isSiderbarOpen })}>
        <section css={mapContainerStyles} ref={mapRef}>
          <div css={baseLayerSelector}>
            {Object.values(baseLayers)
              .sort((a, b) => a.order - b.order)
              .map(({ label, type }) => (
                <button
                  key={type}
                  css={baseLayerSelectBtn({
                    isActive: type === selectedBaseLayer,
                  })}
                  onClick={() => {
                    onSelectBaseLayer(type);
                  }}
                >
                  {label}
                </button>
              ))}
          </div>
          <ZoomControl mapInstance={mapInstance.current} isMapReady={isMapReady} />
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

const baseLayerSelectBtn = ({ isActive }: { isActive: boolean }) => css`
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 16px;
  transition: background-color 0.2s ease-in;

  ${!isActive &&
  css`
    &:hover {
      background-color: ${colors.buttonHover};
    }
  `}

  ${isActive &&
  css`
    font-weight: 500;
    color: ${colors.white};
    background-color: ${colors.buttonFocus};
  `}
`;

const menuContentStyles = css`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const slideMenuTitle = css`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  border-bottom: 1px solid ${colors.borderLight};
  padding-bottom: 12px;
`;

const layerCheckSection = css`
  margin-bottom: 24px;
`;

const checkboxLabel = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;

  &:hover {
    background-color: ${colors.gray50};
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const layersCheckbox = css`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const checkboxText = css`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textSecondary};
  user-select: none;
`;
