// src/types/leaflet-heatmap.d.ts
import * as L from 'leaflet';

declare module 'leaflet' {
  namespace HeatLayer {
    interface Options {
      radius?: number;
      blur?: number;
      maxOpacity?: number;
      minOpacity?: number;
      gradient?: Record<number, string>;
      scaleRadius?: boolean;
      useLocalExtrema?: boolean;
      latField?: string;
      lngField?: string;
      valueField?: string;
    }
  }

  function heatLayer(
    data: number[][],
    options?: HeatLayer.Options
  ): L.Layer;
}