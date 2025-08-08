import SlideMenu from '@/shared/ui/SlideMenu';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function MapLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isDarkMode] = useState(false);

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div css={layoutStyles({ isMenuOpen, isDarkMode })}>
      <SlideMenu isOpen={isMenuOpen} onToggle={handleMenuToggle} />
      <main css={mainStyles({ isMenuOpen, isDarkMode })}>
        <Outlet />
      </main>
    </div>
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
  background-color: ${isDarkMode ? '#1a1a1a' : '#ffffff'};
`;

const mainStyles = ({
  isMenuOpen,
  isDarkMode,
}: {
  isMenuOpen: boolean;
  isDarkMode: boolean;
}) => css`
  flex: 1;
  min-height: 100vh;
  position: relative;
  color: ${isDarkMode ? '#ffffff' : '#000000'};
  background-color: ${isDarkMode ? '#1a1a1a' : '#ffffff'};
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${isMenuOpen ? '280px' : '0px'};
`;
