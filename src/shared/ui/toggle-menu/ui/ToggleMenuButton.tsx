import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { MouseEvent } from 'react';
import { IoMenuOutline } from 'react-icons/io5';

interface ToggleMenuButton {
  onClick: () => void;
}

export const ToggleMenuButton = ({ onClick }: ToggleMenuButton) => {
  const handleClickToggleBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button css={buttonStyles} onClick={handleClickToggleBtn}>
      <IoMenuOutline />
    </button>
  );
};

const buttonStyles = css`
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
