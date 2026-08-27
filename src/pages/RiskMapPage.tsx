import { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Filter, ChevronDown, Plus, Minus, MapPin, Layers, AlertCircle } from 'lucide-react';

const RiskMapPage = () => {
  const [drawMode, setDrawMode] = useState(false);

  const zones = [
    {
      id: '1',
      name: 'East Khasi Hills',
      district: 'Meghalaya',
      riskLevel: 'severe',
      coordinates: [[[25.6, 91.8], [25.7, 91.95], [25.8, 91.9], [25.85, 91.75], [25.7, 91.65], [25.6, 91.7], [25.55, 91.8], [25.6, 91.8]]],
      stats: { rainfall: 178, soilMoisture: 82, deformation: -14.2, riskScore: 87.4 }
    },
    {
      id: '2',
      name: 'West Garo Hills',
      district: 'Meghalaya',
      riskLevel: 'high',
      coordinates: [[[25.5, 90.0], [25.6, 90.2], [25.7, 90.3], [25.8, 90.15], [25.7, 89.95], [25.55, 89.9], [25.5, 90.0]]],
      stats: { rainfall: 145, soilMoisture: 76, deformation: -8.7, riskScore: 72.1 }
    },
    {
      id: '3',
      name: 'Dima Hasao',
      district: 'Assam',
      riskLevel: 'high',
      coordinates: [[[25.2, 92.8], [25.4, 93.0], [25.5, 93.2], [25.6, 93.1], [25.5, 92.9], [25.3, 92.7], [25.2, 92.8]]],
      stats: { rainfall: 156, soilMoisture: 74, deformation: -9.3, riskScore: 74.8 }
    },
    {
      id: '4',
      name: 'Karbi Anglong',
      district: 'Assam',
      riskLevel: 'medium',
      coordinates: [[[26.0, 92.8], [26.2, 93.0], [26.3, 93.2], [26.4, 93.0], [26.2, 92.7], [26.0, 92.8]]],
      stats: { rainfall: 112, soilMoisture: 65, deformation: -3.1, riskScore: 58.2 }
    },
    {
      id: '5',
      name: 'Cachar',
      district: 'Assam',
      riskLevel: 'medium',
      coordinates: [[[24.8, 92.7], [24.9, 92.9], [25.0, 93.0], [25.1, 92.85], [25.0, 92.7], [24.85, 92.65], [24.8, 92.7]]],
      stats: { rainfall: 98, soilMoisture: 62, deformation: -2.8, riskScore: 52.6 }
    }
  ];

  const getRiskColor = (level: string) => {
    const colors = {
      low: '#22c55e',
      medium: '#f59e0b',
      high: '#ef4444',
      severe: '#dc2626'
    };
    return colors[level as keyof typeof colors] || '#6b7280';
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards - Light theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-sm text-gray-500">Total Zones</div>
          <div className="text-2xl font-bold text-gray-900">{zones.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-sm text-gray-500">High Risk Zones</div>
          <div className="text-2xl font-bold text-red-600">
            {zones.filter(z => z.riskLevel === 'severe' || z.riskLevel === 'high').length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-sm text-gray-500">Active Alerts</div>
          <div className="text-2xl font-bold text-yellow-600">4</div>
        </div>
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-sm text-gray-500">Districts</div>
          <div className="text-2xl font-bold text-blue-600">12</div>
        </div>
      </div>

      {/* Controls Bar - Light theme */}
      <div className="bg-white rounded-xl border border-light-200 p-4 relative z-10 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search district or region..."
              className="bg-light-50 border border-light-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-700 hover:bg-light-100 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className="w-3 h-3" />
            </button>
            <button 
              onClick={() => setDrawMode(!drawMode)}
              className={`px-3 py-2 border rounded-lg text-sm transition-colors flex items-center gap-2 ${
                drawMode 
                  ? 'bg-blue-50 border-blue-500 text-blue-600' 
                  : 'bg-light-50 border-light-300 text-gray-700 hover:bg-light-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Draw Region
            </button>
            <button className="px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-700 hover:bg-light-100 transition-colors flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Layers
            </button>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <button className="p-2 bg-light-50 border border-light-300 rounded-lg hover:bg-light-100 transition-colors">
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-light-50 border border-light-300 rounded-lg hover:bg-light-100 transition-colors">
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl border border-light-200 overflow-hidden h-[550px] relative shadow-sm">
        <MapContainer
          center={[25.8, 92.5]}
          zoom={7.5}
          className="h-full w-full"
          style={{ background: '#f0f2f5' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {zones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={zone.coordinates}
              pathOptions={{
                fillColor: getRiskColor(zone.riskLevel),
                fillOpacity: 0.35,
                color: getRiskColor(zone.riskLevel),
                weight: 3,
                opacity: 0.8,
                dashArray: zone.riskLevel === 'severe' ? '8,4' : undefined,
              }}
            >
              <Popup>
                <div className="text-gray-900 min-w-[200px] bg-white rounded-lg p-2">
                  <h3 className="font-bold">{zone.name}</h3>
                  <p className="text-sm text-gray-600">{zone.district}</p>
                  <div className="mt-2 space-y-1 text-sm border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span>Risk Level</span>
                      <span className="font-bold" style={{ color: getRiskColor(zone.riskLevel) }}>
                        {zone.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Score</span>
                      <span className="font-bold">{zone.stats.riskScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rainfall</span>
                      <span className="font-bold text-blue-600">{zone.stats.rainfall}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Soil Moisture</span>
                      <span className="font-bold text-green-600">{zone.stats.soilMoisture}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deformation</span>
                      <span className="font-bold text-red-600">{zone.stats.deformation}mm</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* City Markers */}
          {[
            { name: 'Shillong', pos: [25.5788, 91.8933] },
            { name: 'Guwahati', pos: [26.1445, 91.7362] },
            { name: 'Imphal', pos: [24.8170, 93.9368] },
          ].map((city, idx) => (
            <CircleMarker
              key={idx}
              center={city.pos as [number, number]}
              radius={5}
              pathOptions={{
                fillColor: '#1a1a3e',
                color: '#1a1a3e',
                weight: 2,
                fillOpacity: 0.8,
              }}
            >
              <Popup>
                <div className="text-gray-900">
                  <strong>{city.name}</strong>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Layer Controls - Light theme */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-light-200 p-3 shadow-xl min-w-[150px]">
          <p className="text-xs text-gray-600 font-medium mb-2 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Map Layers
          </p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
              <input 
                type="radio" 
                name="layer" 
                value="single" 
                defaultChecked 
                className="w-3 h-3 accent-blue-500" 
              />
              Single Selection
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
              <input 
                type="radio" 
                name="layer" 
                value="multiple" 
                className="w-3 h-3 accent-blue-500" 
              />
              Multiple Selection
            </label>
          </div>
          <div className="mt-3 pt-3 border-t border-light-200 space-y-2">
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
              <input type="checkbox" defaultChecked className="w-3 h-3 rounded accent-blue-500" />
              🌧️ Rainfall
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
              <input type="checkbox" className="w-3 h-3 rounded accent-blue-500" />
              💧 Soil Moisture
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
              <input type="checkbox" className="w-3 h-3 rounded accent-blue-500" />
              📐 Deformation
            </label>
          </div>
        </div>

        {/* Legend - Light theme */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-light-200 p-3 shadow-xl">
          <p className="text-xs text-gray-600 font-medium mb-1.5">Risk Levels</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-4 h-4 bg-risk-severe rounded opacity-70 border border-risk-severe"></span>
              <span className="text-gray-700">Severe</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-4 h-4 bg-risk-high rounded opacity-70 border border-risk-high"></span>
              <span className="text-gray-700">High</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-4 h-4 bg-risk-medium rounded opacity-70 border border-risk-medium"></span>
              <span className="text-gray-700">Medium</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-4 h-4 bg-risk-low rounded opacity-70 border border-risk-low"></span>
              <span className="text-gray-700">Low</span>
            </div>
          </div>
        </div>

        {/* Info Box - Light theme */}
        <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-light-200 p-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <AlertCircle className="w-4 h-4 text-blue-500" />
            <span>Click on any zone for details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMapPage;