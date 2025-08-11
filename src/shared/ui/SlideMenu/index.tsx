import { css } from '@emotion/react';
import { useState } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { colors } from '@/shared/styles';

interface SlideMenuProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function SlideMenu({ isOpen = true, onToggle }: SlideMenuProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);

  const currentOpen = onToggle ? isOpen : internalOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!currentOpen);
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <>
      <aside css={[slideMenuStyles, !currentOpen && hiddenStyles]}></aside>

      <button
        css={[toggleButtonStyles, !currentOpen && toggleButtonCollapsedStyles]}
        onClick={handleToggle}
      >
        {currentOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
      </button>
    </>
  );
}

const slideMenuStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: ${colors.backgroundLight};
  border-right: 1px solid ${colors.borderLight};
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;

const hiddenStyles = css`
  transform: translateX(-100%);
`;

const toggleButtonStyles = css`
  position: fixed;
  top: 50%;
  width: 30px;
  height: 60px;
  background-color: ${colors.backgroundLight};
  border: 1px solid ${colors.borderLight};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${colors.textSecondary};
  z-index: 1001;
  transform: translate(280px, -50%);
  transition: transform 0.3s ease-in-out, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px ${colors.shadowLight};
`;

const toggleButtonCollapsedStyles = css`
  transform: translate(0px, -50%);
`;
