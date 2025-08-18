import SlideMenu from '@/shared/ui/SlideMenu';
import {
  MapProvider,
  useMapContext,
} from '@/features/Map/model/context/mapContext';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { colors } from '@/shared/styles';

function MapLayoutContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isDarkMode] = useState(false);
  const { isDarkRasterVisible, toggleDarkRaster } = useMapContext();

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div css={layoutStyles({ isMenuOpen, isDarkMode })}>
      <SlideMenu
        isOpen={isMenuOpen}
        onToggle={handleMenuToggle}
        isDarkRasterVisible={isDarkRasterVisible}
        onDarkRasterToggle={toggleDarkRaster}
      />
      <main css={mainStyles({ isMenuOpen, isDarkMode })}>
        <Outlet />
      </main>
    </div>
  );
}

export default function MapLayout() {
  return (
    <MapProvider>
      <MapLayoutContent />
    </MapProvider>
  );
}

// 함수형 CSS 스타일 정의
const layoutStyles = ({
  isDarkMode,
}: {
  isMenuOpen: boolean;
  isDarkMode: boolean;
}) => css`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: ${isDarkMode
    ? colors.backgroundDark
    : colors.backgroundLight};
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
