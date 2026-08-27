import { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  district: string;
  riskLevel: 'low' | 'medium' | 'high' | 'severe';
  coordinates: [number, number][][];
  stats: {
    rainfall: number;
    soilMoisture: number;
    deformation: number;
    riskScore: number;
  };
  population?: number;
  area?: string;
}

const RiskMap = () => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const zones: Zone[] = [
    {
      id: '1',
      name: 'East Khasi Hills',
      district: 'Meghalaya',
      riskLevel: 'severe',
      coordinates: [[
        [25.6, 91.8],
        [25.7, 91.95],
        [25.8, 91.9],
        [25.85, 91.75],
        [25.7, 91.65],
        [25.6, 91.7],
        [25.55, 91.8],
        [25.6, 91.8]
      ]],
      stats: { rainfall: 178, soilMoisture: 82, deformation: -14.2, riskScore: 87.4 },
      population: 385000,
      area: '1,700 km²'
    },
    {
      id: '2',
      name: 'West Garo Hills',
      district: 'Meghalaya',
      riskLevel: 'high',
      coordinates: [[
        [25.5, 90.0],
        [25.6, 90.2],
        [25.7, 90.3],
        [25.8, 90.15],
        [25.7, 89.95],
        [25.55, 89.9],
        [25.5, 90.0]
      ]],
      stats: { rainfall: 145, soilMoisture: 76, deformation: -8.7, riskScore: 72.1 },
      population: 642000,
      area: '2,100 km²'
    },
    {
      id: '3',
      name: 'Dima Hasao',
      district: 'Assam',
      riskLevel: 'high',
      coordinates: [[
        [25.2, 92.8],
        [25.4, 93.0],
        [25.5, 93.2],
        [25.6, 93.1],
        [25.5, 92.9],
        [25.3, 92.7],
        [25.2, 92.8]
      ]],
      stats: { rainfall: 156, soilMoisture: 74, deformation: -9.3, riskScore: 74.8 },
      population: 214000,
      area: '1,800 km²'
    },
    {
      id: '4',
      name: 'Karbi Anglong',
      district: 'Assam',
      riskLevel: 'medium',
      coordinates: [[
        [26.0, 92.8],
        [26.2, 93.0],
        [26.3, 93.2],
        [26.4, 93.0],
        [26.2, 92.7],
        [26.0, 92.8]
      ]],
      stats: { rainfall: 112, soilMoisture: 65, deformation: -3.1, riskScore: 58.2 },
      population: 956000,
      area: '2,800 km²'
    },
    {
      id: '5',
      name: 'Cachar',
      district: 'Assam',
      riskLevel: 'medium',
      coordinates: [[
        [24.8, 92.7],
        [24.9, 92.9],
        [25.0, 93.0],
        [25.1, 92.85],
        [25.0, 92.7],
        [24.85, 92.65],
        [24.8, 92.7]
      ]],
      stats: { rainfall: 98, soilMoisture: 62, deformation: -2.8, riskScore: 52.6 },
      population: 1736000,
      area: '3,000 km²'
    },
    {
      id: '6',
      name: 'Goalpara',
      district: 'Assam',
      riskLevel: 'low',
      coordinates: [[
        [26.1, 90.4],
        [26.2, 90.6],
        [26.3, 90.7],
        [26.4, 90.5],
        [26.25, 90.3],
        [26.1, 90.4]
      ]],
      stats: { rainfall: 45, soilMoisture: 48, deformation: -1.2, riskScore: 32.8 },
      population: 1008000,
      area: '1,900 km²'
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

  const getRiskLabel = (level: string) => {
    const labels = {
      low: '🟢 Low Risk',
      medium: '🟡 Medium Risk',
      high: '🟠 High Risk',
      severe: '🔴 SEVERE RISK'
    };
    return labels[level as keyof typeof labels] || 'Unknown';
  };

  const centerPosition: [number, number] = [25.8, 92.5];

  return (
    <div className="relative h-full w-full">
      <MapContainer
        key="risk-map"
        center={centerPosition}
        zoom={7.5}
        className="h-full w-full"
        style={{ 
          background: '#f0f2f5',
          borderRadius: '8px'
        }}
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
              lineCap: 'round',
              lineJoin: 'round',
              interactive: true,
            }}
            eventHandlers={{
              click: () => setSelectedZone(zone),
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.6,
                  weight: 4,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.35,
                  weight: 3,
                });
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="text-gray-900 min-w-[220px] bg-white rounded-lg p-2">
                <h3 className="font-bold text-lg text-gray-900">{zone.name}</h3>
                <p className="text-sm text-gray-600">{zone.district}</p>
                <div className="mt-2 space-y-1 text-sm border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level</span>
                    <span className="font-bold" style={{ color: getRiskColor(zone.riskLevel) }}>
                      {zone.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Score</span>
                    <span className="font-bold">{zone.stats.riskScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rainfall</span>
                    <span className="font-bold text-blue-600">{zone.stats.rainfall}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Soil Moisture</span>
                    <span className="font-bold text-green-600">{zone.stats.soilMoisture}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deformation</span>
                    <span className="font-bold text-red-600">{zone.stats.deformation}mm</span>
                  </div>
                  {zone.population && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Population</span>
                      <span className="font-bold">{zone.population.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {[
          { name: 'Shillong', pos: [25.5788, 91.8933] },
          { name: 'Guwahati', pos: [26.1445, 91.7362] },
          { name: 'Dispur', pos: [26.1433, 91.7890] },
          { name: 'Imphal', pos: [24.8170, 93.9368] },
          { name: 'Aizawl', pos: [23.7271, 92.7176] },
          { name: 'Kohima', pos: [25.6751, 94.1086] },
          { name: 'Agartala', pos: [23.8315, 91.2868] },
          { name: 'Itanagar', pos: [27.0844, 93.6063] },
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

      {selectedZone && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-light-200 p-5 min-w-[280px] max-w-[340px] shadow-xl"
        >
          <button
            onClick={() => setSelectedZone(null)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-light-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{selectedZone.name}</h3>
              <p className="text-sm text-gray-500">{selectedZone.district}</p>
            </div>
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold animate-pulse"
              style={{ 
                background: `${getRiskColor(selectedZone.riskLevel)}22`,
                color: getRiskColor(selectedZone.riskLevel),
                border: `1px solid ${getRiskColor(selectedZone.riskLevel)}`
              }}
            >
              {getRiskLabel(selectedZone.riskLevel)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-light-50 rounded-lg p-2 text-center border border-light-200">
              <div className="text-xs text-gray-500">Rainfall</div>
              <div className="text-sm font-bold text-blue-600">{selectedZone.stats.rainfall}mm</div>
            </div>
            <div className="bg-light-50 rounded-lg p-2 text-center border border-light-200">
              <div className="text-xs text-gray-500">Soil Moisture</div>
              <div className="text-sm font-bold text-green-600">{selectedZone.stats.soilMoisture}%</div>
            </div>
            <div className="bg-light-50 rounded-lg p-2 text-center border border-light-200">
              <div className="text-xs text-gray-500">Deformation</div>
              <div className="text-sm font-bold text-red-600">{selectedZone.stats.deformation}mm</div>
            </div>
            <div className="bg-light-50 rounded-lg p-2 text-center border border-light-200">
              <div className="text-xs text-gray-500">Risk Score</div>
              <div className="text-sm font-bold text-orange-600">{selectedZone.stats.riskScore}%</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs text-white transition-colors">
              View Details
            </button>
            <button className="flex-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs text-white transition-colors">
              Alert History
            </button>
          </div>
        </motion.div>
      )}

      <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-light-200 p-3 shadow-xl">
        <p className="text-xs text-gray-600 font-medium mb-2">Risk Levels</p>
        <div className="space-y-1.5">
          {[
            { level: 'severe', label: 'Severe Risk', color: '#dc2626' },
            { level: 'high', label: 'High Risk', color: '#ef4444' },
            { level: 'medium', label: 'Medium Risk', color: '#f59e0b' },
            { level: 'low', label: 'Low Risk', color: '#22c55e' },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-2 text-xs">
              <div 
                className="w-4 h-4 rounded" 
                style={{ 
                  background: item.color,
                  opacity: 0.7,
                  border: `1px solid ${item.color}`
                }}
              />
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-light-200">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-gray-700 border border-gray-400" />
            <span className="text-gray-500">Major Cities</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <button 
          className="p-2 bg-white/95 hover:bg-light-100 border border-light-200 rounded-lg text-gray-700 hover:text-gray-900 transition-colors shadow-lg"
          onClick={() => {
            const map = document.querySelector('.leaflet-container') as any;
            if (map && map._leaflet_id) {
              const leafletMap = map._leaflet_map || map;
              if (leafletMap.setView) {
                leafletMap.setView(centerPosition, 7.5);
              }
            }
          }}
        >
          <MapPin className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RiskMap;