import MainMap from '@/features/MainMap';
import { colors } from '@/shared/styles';
import MenuButton from '@/shared/ui/MenuButton';
import { css } from '@emotion/react';
import { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';

export type MapType = 'normal' | 'satellite' | 'terrain';

export default function MapPage() {
  const [mapType, setMapType] = useState<MapType>('normal');
  return (
    <MainMap mapType={mapType}>
      <div css={mapTypeButtonWrapper}>
        <button
          css={mapTypeButton({ isActive: mapType === 'normal' })}
          onClick={() => {
            setMapType('normal');
          }}
        >
          일반
        </button>
        <button
          css={mapTypeButton({ isActive: mapType === 'satellite' })}
          onClick={() => {
            setMapType('satellite');
          }}
        >
          위성
        </button>
        <button
          css={mapTypeButton({ isActive: mapType === 'terrain' })}
          onClick={() => {
            setMapType('terrain');
          }}
        >
          지형
        </button>
      </div>
      <button
        css={menuBtn}
        onClick={() => {
          console.log('Clicked menu');
        }}
      >
        <IoMenuOutline />
      </button>
      <MenuButton customCSS={menuButtonPosition} />
    </MainMap>
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

const mapTypeButtonWrapper = css`
  display: flex;
  flex-direction: row;
  padding: 5px;
  gap: 5px;
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 8px;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;

const mapTypeButton = ({ isActive }: { isActive: boolean }) => css`
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 16px;
  transition: background-color 0.2s ease-in;

  ${!isActive &&
  css`
    &:hover {
      background-color: ${colors.buttonHover};
    }
  `}

  ${isActive &&
  css`
    font-weight: 500;
    color: ${colors.white};
    background-color: ${colors.buttonFocus};
  `}
`;
