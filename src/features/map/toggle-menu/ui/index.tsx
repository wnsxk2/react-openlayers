import { type SerializedStyles } from '@emotion/react';
import {
  ToggleMenu,
  ToggleMenuButton,
  ToggleMenuContent,
  ToggleMenuItem,
} from '@/shared/ui/ToggleMenu';
import { useToggleMenu } from '@/shared/ui/ToggleMenu/model/hooks/useToggleMenu';
import useMapToggleMenu from '@/features/map/toggle-menu/model/hooks/useMapToggleMenu';

interface MapToggleMenuProps {
  position: SerializedStyles;
}

export default function MapToggleMenu({ position }: MapToggleMenuProps) {
  const { isOpen, ref, onToggle } = useToggleMenu();
  const { menuItems } = useMapToggleMenu();

  return (
    <ToggleMenu ref={ref} position={position}>
      <ToggleMenuButton onClick={onToggle} />
      <ToggleMenuContent open={isOpen}>
        {menuItems.map(({ label, onClick }) => (
          <ToggleMenuItem label={label} onClick={onClick} />
        ))}
      </ToggleMenuContent>
    </ToggleMenu>
  );
}
