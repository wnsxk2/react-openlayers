import { useMapContext } from '@/entities/map/model/useMapContext';
import { mapItemList } from '@/features/map/constants';
import BaseLayerSelector from '@/features/map/select-base-layer/ui/BaseLayerSelector';
import BaseLayerSelectorItem from '@/features/map/select-base-layer/ui/BaseLayerSelectorItem';
import type { SerializedStyles } from '@emotion/react';

interface MapSelectorProps {
  customCss?: SerializedStyles;
}

export default function MapSelector({ customCss }: MapSelectorProps) {
  const { mapType: selectedLayer, setMapType } = useMapContext();

  return (
    <BaseLayerSelector customCSS={customCss}>
      {mapItemList.map(({ label, type }) => (
        <BaseLayerSelectorItem
          key={type}
          isActive={selectedLayer === type}
          label={label}
          onClick={() => {
            setMapType(type);
          }}
        />
      ))}
    </BaseLayerSelector>
  );
}
