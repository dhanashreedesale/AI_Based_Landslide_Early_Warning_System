import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, MapPin, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import RiskHeatmap from '../components/Dashboard/RiskHeatmap';

const HeatmapPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const stats = [
    { label: 'Total Data Points', value: '142', icon: Layers, color: 'text-blue-500' },
    { label: 'Peak Risk Intensity', value: '92%', icon: TrendingUp, color: 'text-red-500' },
    { label: 'High Risk Zones', value: '4', icon: AlertTriangle, color: 'text-orange-500' },
    { label: 'Average Risk', value: '58%', icon: Activity, color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <span className="text-red-500">🔥</span>
              Risk Heatmap
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Real-time visualization of landslide risk intensity across Northeast India
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
              ● Live
            </span>
            <span className="text-gray-500">
              Updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[550px] relative shadow-sm">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-500 mt-3">Loading heatmap...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={[25.8, 92.5]}
            zoom={7.5}
            className="h-full w-full"
            style={{ background: '#f0f2f5' }}
          >
            {/* ✅ CHANGED: Using OpenStreetMap tiles - WHITE MAP, NO API KEY REQUIRED */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <RiskHeatmap />
          </MapContainer>
        )}

        {/* Legend - Updated for white map */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 p-3 shadow-xl">
          <p className="text-xs text-gray-600 font-medium mb-1.5">Risk Intensity</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded" style={{ background: '#22c55e' }} />
              <span className="text-gray-700">Low</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded" style={{ background: '#f59e0b' }} />
              <span className="text-gray-700">Medium</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded" style={{ background: '#ef4444' }} />
              <span className="text-gray-700">High</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded" style={{ background: '#dc2626' }} />
              <span className="text-gray-700">Severe</span>
            </div>
          </div>
        </div>

        {/* Info Box - Updated for white map */}
        <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 p-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Activity className="w-4 h-4 text-blue-500" />
            <span>🔥 Hover over heatmap areas to see risk levels</span>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700">🔴 High Risk Areas</h4>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• East Khasi Hills (92%)</li>
            <li>• Dima Hasao (85%)</li>
            <li>• West Garo Hills (78%)</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700">🟡 Medium Risk Areas</h4>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Karbi Anglong (65%)</li>
            <li>• Cachar (55%)</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700">🟢 Low Risk Areas</h4>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Goalpara (35%)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeatmapPage;