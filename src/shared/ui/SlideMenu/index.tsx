import { css } from '@emotion/react';
import { useState } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { colors } from '@/shared/styles';

interface SlideMenuProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  isDarkRasterVisible?: boolean;
  onDarkRasterToggle?: () => void;
}

export default function SlideMenu({
  isOpen = true,
  onToggle,
  isDarkRasterVisible = false,
  onDarkRasterToggle,
}: SlideMenuProps) {
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
      <aside css={[slideMenuStyles, !currentOpen && hiddenStyles]}>
        <div css={menuContentStyles}>
          <h3 css={slideMenuTitle}>레이어 설정</h3>

          <div css={layerCheckSection}>
            <label css={checkboxLabel}>
              <input
                type='checkbox'
                checked={isDarkRasterVisible}
                onChange={onDarkRasterToggle}
                css={layersCheckbox}
              />
              <span css={checkboxText}>다크 레스터 레이어</span>
            </label>
          </div>
        </div>
      </aside>

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

const menuContentStyles = css`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

const slideMenuTitle = css`
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  border-bottom: 1px solid ${colors.borderLight};
  padding-bottom: 12px;
`;

const layerCheckSection = css`
  margin-bottom: 24px;
`;

const checkboxLabel = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;

  &:hover {
    background-color: ${colors.gray50};
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const layersCheckbox = css`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const checkboxText = css`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textSecondary};
  user-select: none;
`;
