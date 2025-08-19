import { useMapContext } from '@/entities/map/model/useMapContext';
import LayerToggleBtn from '@/features/map/toggle-layer/ui/LayerToggleBtn';
import { colors } from '@/shared/styles';
import useSidebar from '@/shared/ui/sidebar/useSidebar';
import { css } from '@emotion/react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

export default function MapSidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  const { isDarkRasterVisible, toggleDarkRaster } = useMapContext();
  return (
    <>
      <aside css={[slideMenuStyles, !isOpen && hiddenStyles]}>
        <div css={menuContentStyles}>
          <h3 css={slideMenuTitle}>레이어 설정</h3>
          <LayerToggleBtn
            label='다크 레스터 레이어'
            checked={isDarkRasterVisible}
            onChange={toggleDarkRaster}
          />
        </div>
      </aside>

      <button
        css={[toggleButtonStyles, !isOpen && toggleButtonCollapsedStyles]}
        onClick={toggleSidebar}
      >
        {isOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
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
