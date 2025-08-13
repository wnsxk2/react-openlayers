import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import { useCallback, type ReactNode } from 'react';

interface MenuToggleButtonProps {
  icon: ReactNode;
  onClick: () => void;
}

export default function MenuToggleButton({
  icon,
  onClick,
}: MenuToggleButtonProps) {
  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <button css={toggleButton} onClick={handleToggle}>
      {icon}
    </button>
  );
}

const toggleButton = css`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 50%;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;
