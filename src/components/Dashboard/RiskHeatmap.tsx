import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface HeatmapDataPoint {
  lat: number;
  lng: number;
  intensity: number; // 0-1 range
}

interface RiskHeatmapProps {
  data?: HeatmapDataPoint[];
  radius?: number;
  maxOpacity?: number;
}

const RiskHeatmap = ({ 
  data, 
  radius = 20, 
  maxOpacity = 0.8 
}: RiskHeatmapProps) => {
  const map = useMap();
  const layerRef = useRef<any>(null);

  useEffect(() => {
    const heatmapData = data || generateSampleData();
    
    if (!map || !heatmapData || heatmapData.length === 0) {
      return;
    }

    if (layerRef.current) {
      try {
        map.removeLayer(layerRef.current);
      } catch (e) {
        // Ignore
      }
      layerRef.current = null;
    }

    try {
      const group = L.featureGroup();

      const intensities = heatmapData.map(d => d.intensity);
      const maxIntensity = Math.max(...intensities);
      const minIntensity = Math.min(...intensities);

      heatmapData.forEach((point) => {
        const normalizedIntensity = maxIntensity > minIntensity 
          ? (point.intensity - minIntensity) / (maxIntensity - minIntensity)
          : point.intensity;

        const pointRadius = radius * (0.5 + normalizedIntensity * 0.5);
        const color = getRiskColor(normalizedIntensity);

        const circle = L.circle([point.lat, point.lng], {
          radius: pointRadius * 1000,
          fillColor: color,
          fillOpacity: maxOpacity * (0.3 + normalizedIntensity * 0.5),
          color: color,
          weight: 1,
          opacity: 0.5,
        });

        circle.bindPopup(`
          <div style="padding: 8px; font-family: Arial, sans-serif;">
            <strong style="color: #1a1a2e;">Risk Intensity:</strong> 
            <span style="color: ${color}; font-weight: bold;">${Math.round(point.intensity * 100)}%</span><br>
            <span style="color: #4a4a6a;">${getRiskLabel(normalizedIntensity)}</span>
          </div>
        `);

        group.addLayer(circle);
      });

      group.addTo(map);
      layerRef.current = group;

    } catch (error) {
      console.error('Error creating heatmap:', error);
    }

    return () => {
      if (layerRef.current) {
        try {
          map.removeLayer(layerRef.current);
        } catch (e) {
          // Ignore
        }
        layerRef.current = null;
      }
    };
  }, [map, data, radius, maxOpacity]);

  return null;
};

const getRiskColor = (intensity: number): string => {
  if (intensity >= 0.8) return '#dc2626';
  if (intensity >= 0.6) return '#ef4444';
  if (intensity >= 0.4) return '#f59e0b';
  if (intensity >= 0.2) return '#84cc16';
  return '#22c55e';
};

const getRiskLabel = (intensity: number): string => {
  if (intensity >= 0.8) return '🔴 Severe Risk';
  if (intensity >= 0.6) return '🟠 High Risk';
  if (intensity >= 0.4) return '🟡 Medium Risk';
  if (intensity >= 0.2) return '🟢 Low-Medium Risk';
  return '🟢 Low Risk';
};

const generateSampleData = (): HeatmapDataPoint[] => {
  const points: HeatmapDataPoint[] = [];
  
  const regions = [
    { lat: 25.6, lng: 91.8, risk: 0.92 },
    { lat: 25.5, lng: 90.0, risk: 0.78 },
    { lat: 25.3, lng: 92.8, risk: 0.85 },
    { lat: 26.0, lng: 93.0, risk: 0.65 },
    { lat: 24.9, lng: 92.8, risk: 0.55 },
    { lat: 26.1, lng: 90.4, risk: 0.35 },
    { lat: 25.8, lng: 92.5, risk: 0.45 },
    { lat: 26.5, lng: 91.5, risk: 0.70 },
    { lat: 25.0, lng: 93.5, risk: 0.60 },
    { lat: 26.2, lng: 92.2, risk: 0.75 },
    { lat: 25.9, lng: 93.8, risk: 0.50 },
    { lat: 27.0, lng: 92.0, risk: 0.40 },
  ];

  regions.forEach((region) => {
    points.push({
      lat: region.lat,
      lng: region.lng,
      intensity: region.risk,
    });

    for (let i = 0; i < 12; i++) {
      const latOffset = (Math.random() - 0.5) * 0.4;
      const lngOffset = (Math.random() - 0.5) * 0.4;
      const intensityVariation = 0.5 + Math.random() * 0.6;
      
      points.push({
        lat: region.lat + latOffset,
        lng: region.lng + lngOffset,
        intensity: Math.min(region.risk * intensityVariation, 1.0),
      });
    }
  });

  return points;
};

export default RiskHeatmap;