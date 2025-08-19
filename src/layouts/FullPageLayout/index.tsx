import { MapProvider } from '@/features/Map/model/context/mapContext';
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export default function FullPageLayout() {
  return (
    <MapProvider>
      <main css={layoutStyles}>
        <Outlet />
      </main>
    </MapProvider>
  );
}

const layoutStyles = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
