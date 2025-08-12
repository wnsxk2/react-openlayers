import { colors } from '@/shared/styles';
import { css, type SerializedStyles } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';

interface MenuButtonProps {
  customCSS: SerializedStyles;
  onClick: () => void;
}

export default function MenuButton({ customCSS, onClick }: MenuButtonProps) {
  const [isShow, setShow] = useState(false);
  const inSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isShow && e.target instanceof Element && inSection.current) {
        if (!inSection.current.contains(e.target)) {
          setShow(false);
        }
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isShow]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  return (
    <div css={[menuWrapper, customCSS]} ref={inSection}>
      <button css={menuBtn} onClick={handleToggle}>
        <IoMenuOutline />
      </button>
      <div css={[menuContentWrapper, !isShow && menuContentWrapperHidden]}>
        <button css={contentBtn} onClick={() => {}}>
          <span>로그인</span>
        </button>
        <button css={contentBtn}>
          <span>라이트모드</span>
        </button>
        <button css={contentBtn}>
          <span>한국어</span>
        </button>
      </div>
    </div>
  );
}

const menuWrapper = css`
  position: absolute;
  z-index: 100;
`;

const menuBtn = css`
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

const menuContentWrapper = css`
  position: absolute;
  /* TODO:  나타나는 위치 변경 할 수 있도록 수정 */
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 160px;
  margin-top: 6px;
  background-color: ${colors.white};
  border-radius: 8px;
  border: 1px solid ${colors.borderLight};
  box-shadow: 0 2px 8px ${colors.shadowLight};
  overflow: hidden;
  max-height: 1000px;
  opacity: 1;
  /* 위치를 이동 시켜 자연스럽게 애니메이션 처리 */
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const menuContentWrapperHidden = css`
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
  border-color: transparent;
  box-shadow: none;
`;

const contentBtn = css`
  width: 100%;
  text-align: start;
  padding-left: 8px;
  border-bottom: 1px solid ${colors.borderLight};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${colors.gray100};
  }
  span {
    font-size: 14px;
  }
`;
