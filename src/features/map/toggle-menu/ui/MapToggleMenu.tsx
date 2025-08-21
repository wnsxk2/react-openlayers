import { css, type SerializedStyles } from '@emotion/react';
import {
  ToggleMenuButton,
  ToggleMenuContent,
  ToggleMenuItem,
  useToggleMenu,
} from '@/shared/ui/toggle-menu';
import { useMapToggleMenu } from '.././model/hooks/useMapToggleMenu';

interface MapToggleMenuProps {
  position: SerializedStyles;
}

export function MapToggleMenu({ position }: MapToggleMenuProps) {
  const { isOpen, ref, onToggle } = useToggleMenu();
  const { menuItems } = useMapToggleMenu();

  return (
    <div css={[containerStyles, position]} ref={ref}>
      <ToggleMenuButton onClick={onToggle} />
      <ToggleMenuContent open={isOpen}>
        {menuItems.map(({ label, onClick }) => (
          <ToggleMenuItem key={label} label={label} onClick={onClick} />
        ))}
      </ToggleMenuContent>
    </div>
  );
}

const containerStyles = css`
  position: absolute;
  z-index: 100;
`;
