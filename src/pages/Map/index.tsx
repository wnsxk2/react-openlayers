import { useNavigate } from 'react-router-dom';
import Map from '@/features/Map/ui/Map';
import { colors } from '@/shared/styles';
import MenuButton from '@/shared/ui/MenuButton';
import { css } from '@emotion/react';
import { IoMenuOutline } from 'react-icons/io5';
import { useState } from 'react';
import SlideMenu from '@/shared/ui/SlideMenu';
import { useMapContext } from '@/entities/map/model/useMapContext';
import { MapProvider } from '@/entities/map/model/MapContext';

export function MapPageContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isDarkMode] = useState(false);

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const { isDarkRasterVisible, toggleDarkRaster } = useMapContext();

  const navigate = useNavigate();
  return (
    <>
      <SlideMenu
        isOpen={isMenuOpen}
        onToggle={handleMenuToggle}
        isDarkRasterVisible={isDarkRasterVisible}
        onDarkRasterToggle={toggleDarkRaster}
      />
      <main css={mainStyles({ isMenuOpen, isDarkMode })}>
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
        </Map>
      </main>
    </>
  );
}

export default function MapPage() {
  return (
    <MapProvider>
      <MapPageContent />
    </MapProvider>
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

const mainStyles = ({
  isMenuOpen,
  isDarkMode,
}: {
  isMenuOpen: boolean;
  isDarkMode: boolean;
}) => css`
  display: flex;
  flex: 1;
  min-height: 100vh;
  position: relative;
  color: ${isDarkMode ? colors.white : colors.black};
  background-color: ${isDarkMode
    ? colors.backgroundDark
    : colors.backgroundLight};
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${isMenuOpen ? '280px' : '0px'};
`;
