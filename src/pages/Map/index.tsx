import Map from '@/features/Map/ui/Map';
import { colors } from '@/shared/styles';
import MenuButton from '@/shared/ui/MenuButton';
import { css } from '@emotion/react';
import { IoMenuOutline } from 'react-icons/io5';

export default function MapPage() {
  return (
    <Map>
      <button
        css={menuBtn}
        onClick={() => {
          console.log('Clicked menu');
        }}
      >
        <IoMenuOutline />
      </button>
      <MenuButton customCSS={menuButtonPosition} />
    </Map>
  );
}
const menuButtonPosition = css`
  top: 50px;
  right: 15px;
`;

const menuBtn = css`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 100;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 50%;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;
