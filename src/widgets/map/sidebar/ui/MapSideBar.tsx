// import { colors } from '@/shared/styles';
// import { css } from '@emotion/react';
// import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

// interface MapSideBarProps {}

// export const MapSideBar = () => {
//   return (
//     <aside css={[sidebarStyles, !isSiderbarOpen && hideSidebarStyles]}>
//       <div css={menuContentStyles}>
//         <h3 css={slideMenuTitle}>레이어 설정</h3>
//       </div>
//       <button css={toggleButtonStyles} onClick={onToggleSidebar}>
//         {isSiderbarOpen ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
//       </button>
//     </aside>
//   );
// };

// const sidebarStyles = css`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 280px;
//   height: 100vh;
//   background-color: ${colors.backgroundLight};
//   border-right: 1px solid ${colors.borderLight};
//   transform: translateX(0);
//   transition: transform 0.3s ease-in-out;
//   z-index: 1000;
//   box-shadow: 2px 0 8px ${colors.shadowLight};
// `;

// const hideSidebarStyles = css`
//   transform: translateX(-100%);
// `;

// const mainStyles = ({ isOpen }: { isOpen: boolean }) => css`
//   display: flex;
//   flex: 1;
//   min-height: 100vh;
//   position: relative;
//   background-color: ${colors.backgroundLight};
//   transition: margin-left 0.3s ease-in-out;
//   margin-left: ${isOpen ? '280px' : '0px'};
// `;

// const toggleButtonStyles = css`
//   position: fixed;
//   top: 50%;
//   width: 30px;
//   height: 60px;
//   background-color: ${colors.backgroundLight};
//   border: 1px solid ${colors.borderLight};
//   border-top-right-radius: 8px;
//   border-bottom-right-radius: 8px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   color: ${colors.textSecondary};
//   z-index: 1001;
//   transform: translate(280px, -50%);
//   transition: transform 0.3s ease-in-out, box-shadow 0.2s ease;
//   box-shadow: 0 2px 8px ${colors.shadowLight};
// `;
