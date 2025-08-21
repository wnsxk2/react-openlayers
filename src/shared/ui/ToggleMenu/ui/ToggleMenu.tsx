import { css, type SerializedStyles } from '@emotion/react';
import { forwardRef, type PropsWithChildren } from 'react';

interface ToggleMenuProps extends PropsWithChildren {
  position: SerializedStyles;
}

export const ToggleMenu = forwardRef<HTMLDivElement, ToggleMenuProps>(
  ({ position, children }, ref) => {
    return (
      <div css={[containerStyles, position]} ref={ref}>
        {children}
      </div>
    );
  }
);

const containerStyles = css`
  position: absolute;
  z-index: 100;
`;
