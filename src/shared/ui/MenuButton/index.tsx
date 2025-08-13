import MenuContent from '@/shared/ui/MenuButton/MenuContent';
import MenuToggleButton from '@/shared/ui/MenuButton/MenuToggleButton';
import MenuWrapper from '@/shared/ui/MenuButton/MenuWrapper';
import { type SerializedStyles } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';

interface MenuButtonProps {
  customCSS: SerializedStyles;
}

export default function MenuButton({ customCSS }: MenuButtonProps) {
  const [isOpen, setOpen] = useState(false);
  const inSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isOpen && !inSection.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpen]);

  const handleMenuOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <MenuWrapper customCSS={customCSS} ref={inSection}>
      <MenuToggleButton icon={<IoMenuOutline />} onClick={handleMenuOpen} />
      <MenuContent isOpen={isOpen} />
    </MenuWrapper>
  );
}
