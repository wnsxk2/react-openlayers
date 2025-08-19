import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export default function FullPageLayout() {
  return (
    <main css={layoutStyles}>
      <Outlet />
    </main>
  );
}

const layoutStyles = css`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
