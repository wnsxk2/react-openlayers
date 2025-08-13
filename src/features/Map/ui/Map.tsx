import useMap from '@/features/Map/model/hooks/useMap';
import MapSelector from '@/features/Map/ui/MapSelector';
import { css } from '@emotion/react';
import { type PropsWithChildren } from 'react';

export default function Map({ children }: PropsWithChildren) {
  const { mapRef, mapType, setMapType } = useMap();

  return (
    <div css={mapWrapper}>
      <MapSelector
        mapType={mapType}
        setMap={setMapType}
        customCSS={mapTypeSelector}
      />
      <div css={mapElement} ref={mapRef} />
      {children}
    </div>
  );
}

const mapWrapper = css`
  overflow: hidden;
  flex: 1;
  position: relative;
`;

const mapElement = css`
  width: 100%;
  height: 100%;
`;

const mapTypeSelector = css`
  top: 15px;
  left: 15px;
`;
