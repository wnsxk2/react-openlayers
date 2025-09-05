import { colors } from '@/shared/styles';
import { css } from '@emotion/react';

interface BookmarkItemProps {
  name: string;
  center: number[];
  onClick: () => void;
}

export const BookmarkItem = ({ name, center, onClick }: BookmarkItemProps) => {
  return (
    <div css={containerStyles} onClick={onClick}>
      <p>🔖 {name}</p>
      <p>📍 {center.join(' ')}</p>
    </div>
  );
};
const containerStyles = css`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  cursor: pointer;
  padding: 8px;
  color: ${colors.white};
  background-color: ${colors.buttonFocus};
  border-radius: 4px;

  &:hover {
    opacity: 0.6;
  }
`;
