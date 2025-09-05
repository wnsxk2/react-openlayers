import { useOverlay } from '@/entities/map/ui/OverlayProvider';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import { forwardRef } from 'react';

export const PointTooltip = forwardRef<HTMLDivElement>((_, ref) => {
  const { locationName, type, region, importance, latitude, longitude } =
    useOverlay();
  return (
    <div ref={ref} css={tooltipOverlayStyles}>
      <span css={nameStyles}>{locationName}</span>
      <p>타입 : {type}</p>
      <p>지역 : {region}</p>
      <p>중요도 : {importance}</p>
      <p>위도 : {latitude?.toFixed(4)}</p>
      <p>경도 : {longitude?.toFixed(4)}</p>
    </div>
  );
});

const tooltipOverlayStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 250px;
  font-size: 14px;
  padding: 8px;
  border: 1px solid ${colors.borderLight};
  border-radius: 8px;
  box-shadow: 2px 0 8px ${colors.shadowLight};
  background-color: ${colors.backgroundLight};
  transition: background-color 0.2s ease-in;
`;

const nameStyles = css`
  padding: 2px 6px;
  color: ${colors.white};
  background-color: ${colors.buttonFocus};
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
`;
