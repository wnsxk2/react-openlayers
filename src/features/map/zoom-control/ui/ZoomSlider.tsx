import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import type { ChangeEvent } from 'react';

interface ZoomSliderProps {
  zoom: number;
  max: number;
  min: number;
  onChange: (value: number) => void;
}

export const ZoomSlider = ({ zoom, max, min, onChange }: ZoomSliderProps) => {
  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div css={containerStyles}>
      <input
        type='range'
        min={min}
        max={max}
        value={zoom}
        onChange={handleZoomChange}
        css={sliderInput}
      />
      <div css={sliderTrack}>
        <div
          css={sliderFill}
          style={{ width: `${((zoom - min) / (max - min)) * 100}%` }}
        />
      </div>
    </div>
  );
};

const containerStyles = css`
  position: relative;
  height: 20px;
  display: flex;
  flex: 1;
  align-items: center;
  margin: auto 10px;
`;

const sliderInput = css`
  width: 100%;
  height: 4px;
  background: transparent;
  appearance: none;
  position: absolute;
  z-index: 2;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: ${colors.buttonFocus};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${colors.white};
    box-shadow: 0 2px 4px ${colors.shadowLight};
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background-color: ${colors.buttonFocus};
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid ${colors.white};
    box-shadow: 0 2px 4px ${colors.shadowLight};
  }
`;

const sliderTrack = css`
  width: 100%;
  height: 4px;
  background-color: ${colors.gray200};
  border-radius: 2px;
  position: relative;
  overflow: hidden;
`;

const sliderFill = css`
  height: 100%;
  background-color: ${colors.buttonFocus};
  border-radius: 2px;
`;
