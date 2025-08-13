import { mapItemList } from '@/features/Map/constants';
import type { MapType } from '@/features/Map/model/types';
import MapSelectorItem from '@/features/Map/ui/MapSelectorItem';
import { colors } from '@/shared/styles';
import { css, type SerializedStyles } from '@emotion/react';

interface MapSelectorProps {
  mapType: MapType;
  customCSS: SerializedStyles;
  setMap: (type: MapType) => void;
}

export default function MapSelector({
  mapType,
  customCSS,
  setMap,
}: MapSelectorProps) {
  return (
    <div css={[wrapper, customCSS]}>
      {mapItemList.map(({ label, type }) => (
        <MapSelectorItem
          key={type}
          isActive={mapType === type}
          label={label}
          onClick={() => {
            setMap(type);
          }}
        />
      ))}
    </div>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: row;
  z-index: 100;
  padding: 5px;
  gap: 5px;
  position: absolute;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 8px;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;
