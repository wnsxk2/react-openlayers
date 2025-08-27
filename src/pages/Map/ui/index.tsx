import { OverlayProvider, useMap, useTooltipOverlay } from '@/entities/map';
import { PolygonTooltip } from '@/features/map/polygon-tooltip';
import { MapToggleMenu } from '@/features/map/toggle-menu';
import { colors } from '@/shared/styles';
import { MapControls } from '@/widgets/map/map-controls';
import { MapSideBar } from '@/widgets/map/sidebar/ui/MapSideBar';
import { css } from '@emotion/react';
import { useState } from 'react';

const DEFAULT_ZOOM = 12;
const DEFAULT_CENTER = [126.9779, 37.5663];

export default function MapPage() {
  // sidebar
  const [isSiderBarOpen, setSideBarOpen] = useState(true);

  const handleToggleSideBar = () => setSideBarOpen((prev) => !prev);

  // map
  const { mapRef, mapInstance, isMapReady } = useMap({
    zoom: DEFAULT_ZOOM,
    center: DEFAULT_CENTER,
  });
  const { tooltipRef } = useTooltipOverlay({
    id: 'polygon',
    mapInstance,
  });

  return (
    <OverlayProvider>
      <div css={layoutStyles}>
        <MapSideBar
          mapInstance={mapInstance}
          isMapReady={isMapReady}
          isOpen={isSiderBarOpen}
          onToggle={handleToggleSideBar}
        />
        <main css={mainStyles({ isOpen: isSiderBarOpen })}>
          <section css={mapContainerStyles} ref={mapRef}>
            <MapControls mapInstance={mapInstance} isMapReady={isMapReady} />
            <PolygonTooltip ref={tooltipRef} />
          </section>

          <MapToggleMenu
            position={css`
              top: 15px;
              right: 15px;
            `}
          />
        </main>
      </div>
    </OverlayProvider>
  );
}

// main
const layoutStyles = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
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

// map
const mapContainerStyles = css`
  width: 100%;
  height: 100%;
`;
