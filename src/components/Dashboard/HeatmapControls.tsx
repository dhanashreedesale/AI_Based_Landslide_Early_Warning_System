import { useState } from 'react';
import { Sliders, Thermometer, Droplets, Ruler, RefreshCw } from 'lucide-react';

interface HeatmapControlsProps {
  onRadiusChange: (radius: number) => void;
  onOpacityChange: (opacity: number) => void;
  onRefresh: () => void;
}

const HeatmapControls = ({ onRadiusChange, onOpacityChange, onRefresh }: HeatmapControlsProps) => {
  const [radius, setRadius] = useState(25);
  const [opacity, setOpacity] = useState(0.8);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Radius:</span>
          <input
            type="range"
            min="10"
            max="50"
            value={radius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setRadius(val);
              onRadiusChange(val);
            }}
            className="w-24 accent-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">{radius}</span>
        </div>

        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Opacity:</span>
          <input
            type="range"
            min="0.2"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setOpacity(val);
              onOpacityChange(val);
            }}
            className="w-24 accent-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">{Math.round(opacity * 100)}%</span>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors ml-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default HeatmapControls;