import { useEffect, useRef, useState } from 'react';

export function useToggleMenu() {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  return {
    isOpen,
    ref,
    onToggle: handleToggle,
    onOpen: handleOpen,
    onClose: handleClose,
  };
}
