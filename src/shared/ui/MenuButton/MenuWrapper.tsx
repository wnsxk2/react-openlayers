import { css, type SerializedStyles } from '@emotion/react';
import { forwardRef, type PropsWithChildren } from 'react';

interface MenuWrapperProps extends PropsWithChildren {
  customCSS: SerializedStyles;
}

const MenuWrapper = forwardRef<HTMLDivElement, MenuWrapperProps>(
  ({ customCSS, children }, ref) => {
    return (
      <div css={[wrapper, customCSS]} ref={ref}>
        {children}
      </div>
    );
  }
);

const wrapper = css`
  position: absolute;
  z-index: 100;
`;
export default MenuWrapper;
