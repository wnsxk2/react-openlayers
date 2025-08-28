import { useOverlay } from '@/entities/map/ui/OverlayProvider';
import { colors } from '@/shared/styles';
import { css } from '@emotion/react';
import { forwardRef } from 'react';

export const PolygonTooltip = forwardRef<HTMLDivElement>((_, ref) => {
  const { name, description, category, area, center } = useOverlay();
  return (
    <div ref={ref} css={tooltipOverlayStyles}>
      <span css={nameStyles}>{name}</span>
      <span css={descStyles}>{description}</span>
      <p>종류 : {category}</p>
      <p>면적 : {area}km²</p>
      <p>중심점 : {center?.join(' ')}</p>
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
`;

const nameStyles = css`
  padding: 2px 6px;
  color: ${colors.white};
  background-color: ${colors.buttonFocus};
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
`;

const descStyles = css`
  white-space: normal;
  word-wrap: break-word;
  word-break: keep-all;
  overflow-wrap: break-word;
`;
