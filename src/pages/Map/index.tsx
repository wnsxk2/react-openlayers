import { useNavigate } from 'react-router-dom';
import Map from '@/features/map/ui/Map';
import { colors } from '@/shared/styles';
import MenuButton from '@/shared/ui/MenuButton';
import { css } from '@emotion/react';
import { IoMenuOutline } from 'react-icons/io5';
import { useMapContext } from '@/entities/map/model/useMapContext';
import { MapProvider } from '@/entities/map/model/MapContext';
import MapSidebar from '@/pages/Map/ui/MapSidebar';
import { SidebarProvider } from '@/shared/ui/sidebar/SidebarContext';
import useSidebar from '@/shared/ui/sidebar/useSidebar';
import MapSelector from '@/pages/Map/ui/MapSelector';
import { mapItemList } from '@/features/map/constants';

export function MapPageContent() {
  const { isOpen } = useSidebar();

  const { mapType, setMapType, isDarkRasterVisible, toggleDarkRaster } =
    useMapContext();

  const navigate = useNavigate();
  return (
    <>
      <MapSidebar />
      <main css={mainStyles({ isOpen })}>
        <Map>
          <button
            css={menuBtn}
            onClick={() => {
              console.log('Clicked menu');
              navigate('/login');
            }}
          >
            <IoMenuOutline />
          </button>
          <MenuButton customCSS={menuButtonPosition} />
          <MapSelector
            customCss={mapSelectorStyles}
            baseLayers={mapItemList}
            selectedLayer={mapType}
            onSelect={setMapType}
          />
        </Map>
      </main>
    </>
  );
}

export default function MapPage() {
  return (
    <SidebarProvider>
      <MapProvider>
        <MapPageContent />
      </MapProvider>
    </SidebarProvider>
  );
}
const menuButtonPosition = css`
  top: 50px;
  right: 15px;
`;

const menuBtn = css`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 100;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 50%;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;

const mainStyles = ({ isOpen }: { isOpen: boolean }) => css`
  display: flex;
  flex: 1;
  min-height: 100vh;
  position: relative;
  color: ${colors.white};
  background-color: ${colors.backgroundLight};
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${isOpen ? '280px' : '0px'};
`;

const mapSelectorStyles = css`
  top: 15px;
  left: 15px;
`;
