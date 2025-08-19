import type { MapTypeItem } from '@/features/map/model/types';
import BaseLayerSelector from '@/features/map/select-base-layer/ui/BaseLayerSelector';
import BaseLayerSelectorItem from '@/features/map/select-base-layer/ui/BaseLayerSelectorItem';
import type { SerializedStyles } from '@emotion/react';

interface MapSelectorProps {
  customCss?: SerializedStyles;
  baseLayers: MapTypeItem[];
  selectedLayer: string;
  onSelect: (type: string) => void;
}

export default function MapSelector({
  customCss,
  baseLayers,
  selectedLayer,
  onSelect,
}: MapSelectorProps) {
  return (
    <BaseLayerSelector customCSS={customCss}>
      {baseLayers.map(({ label, type }) => (
        <BaseLayerSelectorItem
          key={type}
          isActive={selectedLayer === type}
          label={label}
          onClick={() => {
            onSelect(type);
          }}
        />
      ))}
    </BaseLayerSelector>
  );
}
