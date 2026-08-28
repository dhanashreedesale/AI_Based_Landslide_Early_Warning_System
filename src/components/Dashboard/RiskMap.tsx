import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, AlertTriangle, Layers, Maximize2, ShieldAlert } from 'lucide-react';
import { useMapStore } from '../../store';
import { FOCUS_REGIONS_DATA, MAJOR_FOCUS_CITIES, LandslideZone, DEFAULT_FOCUS_REGIONS } from '../../data/focusRegionsData';

const RiskMap = () => {
  const { selectedRegions, selectedZone: storeSelectedZone, setSelectedZone: setStoreSelectedZone, center, zoom, resetToDefaultRegions } = useMapStore();
  const [localSelectedZone, setLocalSelectedZone] = useState<LandslideZone | null>(null);

  // Filter zones based on user-selected regions (default includes all 12 focus regions)
  const activeZones = useMemo(() => {
    return FOCUS_REGIONS_DATA.filter((zone) => selectedRegions.includes(zone.state));
  }, [selectedRegions]);

  const activeCities = useMemo(() => {
    return MAJOR_FOCUS_CITIES.filter((city) => selectedRegions.includes(city.state));
  }, [selectedRegions]);

  const activeZone = localSelectedZone || FOCUS_REGIONS_DATA.find((z) => z.id === storeSelectedZone) || null;

  const getRiskColor = (level: string) => {
    const colors = {
      low: '#22c55e',
      medium: '#f59e0b',
      high: '#ef4444',
      severe: '#dc2626',
    };
    return colors[level as keyof typeof colors] || '#6b7280';
  };

  const getRiskLabel = (level: string) => {
    const labels = {
      low: '🟢 Low Risk',
      medium: '🟡 Medium Risk',
      high: '🟠 High Risk',
      severe: '🔴 SEVERE RISK',
    };
    return labels[level as keyof typeof labels] || 'Unknown';
  };

  const isDefault12Selected =
    selectedRegions.length === DEFAULT_FOCUS_REGIONS.length &&
    DEFAULT_FOCUS_REGIONS.every((r) => selectedRegions.includes(r));

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-inner">
      <MapContainer
        key={`risk-map-${selectedRegions.length}`}
        center={center}
        zoom={zoom}
        className="h-full w-full"
        style={{
          background: '#e5e9f0',
          borderRadius: '12px',
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Landslide Warning Focus Regions'
        />

        {/* Polygons for active landslide risk zones */}
        {activeZones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              fillColor: getRiskColor(zone.riskLevel),
              fillOpacity: 0.45,
              color: getRiskColor(zone.riskLevel),
              weight: 3,
              opacity: 0.85,
              dashArray: zone.riskLevel === 'severe' ? '6,4' : undefined,
              lineCap: 'round',
              lineJoin: 'round',
            }}
            eventHandlers={{
              click: () => {
                setLocalSelectedZone(zone);
                setStoreSelectedZone(zone.id);
              },
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 4,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.45,
                  weight: 3,
                });
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="text-gray-900 min-w-[240px] bg-white rounded-lg p-2.5 shadow-md">
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5 mb-2">
                  <h3 className="font-bold text-base text-gray-900">{zone.name}</h3>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase"
                    style={{ backgroundColor: getRiskColor(zone.riskLevel) }}
                  >
                    {zone.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium">{zone.district}, {zone.state}</p>

                <div className="mt-2 space-y-1.5 text-xs border-t border-gray-100 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Risk Score</span>
                    <span className="font-bold text-gray-900">{zone.stats.riskScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">24h Rainfall</span>
                    <span className="font-bold text-blue-600">{zone.stats.rainfall} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Soil Saturation</span>
                    <span className="font-bold text-green-600">{zone.stats.soilMoisture}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Deformation</span>
                    <span className="font-bold text-red-600">{zone.stats.deformation} mm</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-gray-100 bg-red-50 -mx-2.5 -mb-2.5 p-2 rounded-b-lg">
                  <p className="text-[11px] text-red-800 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-600 flex-shrink-0" />
                    <span className="truncate">{zone.keyThreat}</span>
                  </p>
                </div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Major City Reference Markers */}
        {activeCities.map((city, idx) => (
          <CircleMarker
            key={`city-${idx}`}
            center={city.pos}
            radius={6}
            pathOptions={{
              fillColor: '#1e293b',
              color: '#ffffff',
              weight: 2,
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <div className="text-gray-900 font-semibold text-xs">
                <strong>{city.name}</strong> ({city.state})
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Focus Region Status Badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md rounded-lg border border-gray-200 p-2.5 shadow-lg max-w-[280px]">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span className="text-xs font-bold text-gray-900">
            {isDefault12Selected ? '12 Focus Regions Active (Default)' : `${selectedRegions.length} Focus Regions Filtered`}
          </span>
        </div>
        <p className="text-[11px] text-gray-600 leading-tight">
          Monitoring Uttarakhand, Himachal, J&K, Ladakh, Sikkim, Arunachal, Assam, Meghalaya, Nagaland, Manipur, Mizoram, Tripura.
        </p>
      </div>

      {/* Map Control Buttons */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
        <button
          onClick={resetToDefaultRegions}
          className="p-2.5 bg-white/95 hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:text-blue-600 transition-colors shadow-lg flex items-center gap-1.5 text-xs font-semibold"
          title="Reset Map to All 12 Focus Regions"
        >
          <Maximize2 className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Fit All 12 Regions</span>
        </button>
      </div>

      {/* Selected Zone Bottom Sheet Modal */}
      <AnimatePresence>
        {activeZone && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 p-4 min-w-[300px] max-w-[360px] shadow-2xl"
          >
            <button
              onClick={() => {
                setLocalSelectedZone(null);
                setStoreSelectedZone(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start justify-between mb-2 pr-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  {activeZone.state} • {activeZone.regionGroup}
                </span>
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{activeZone.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  {activeZone.district} District
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                {getRiskLabel(activeZone.riskLevel)}
              </span>
            </div>

            <div className="my-2.5 p-2 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">Primary Threat</span>
              <p className="text-xs text-red-900 font-semibold">{activeZone.keyThreat}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                <div className="text-[10px] text-gray-500 uppercase font-medium">24h Rainfall</div>
                <div className="text-sm font-bold text-blue-600">{activeZone.stats.rainfall} mm</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                <div className="text-[10px] text-gray-500 uppercase font-medium">Soil Saturation</div>
                <div className="text-sm font-bold text-green-600">{activeZone.stats.soilMoisture}%</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                <div className="text-[10px] text-gray-500 uppercase font-medium">Deformation</div>
                <div className="text-sm font-bold text-red-600">{activeZone.stats.deformation} mm</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                <div className="text-[10px] text-gray-500 uppercase font-medium">Risk Index</div>
                <div className="text-sm font-bold text-orange-600">{activeZone.stats.riskScore}%</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                onClick={() => alert(`Detailed sensor telemetries for ${activeZone.name} (${activeZone.state})`)}
              >
                Sensor Telemetry
              </button>
              <button
                className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                onClick={() => alert(`Evacuation advisory triggered for ${activeZone.name}`)}
              >
                Issue Advisory
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 p-3 shadow-xl">
        <p className="text-xs text-gray-700 font-bold mb-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          Risk Levels
        </p>
        <div className="space-y-1.5">
          {[
            { level: 'severe', label: 'Severe Risk (≥85%)', color: '#dc2626' },
            { level: 'high', label: 'High Risk (70-84%)', color: '#ef4444' },
            { level: 'medium', label: 'Medium Risk (50-69%)', color: '#f59e0b' },
            { level: 'low', label: 'Low Risk (<50%)', color: '#22c55e' },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-2 text-[11px]">
              <div
                className="w-3.5 h-3.5 rounded"
                style={{
                  background: item.color,
                  opacity: 0.8,
                  border: `1px solid ${item.color}`,
                }}
              />
              <span className="text-gray-700 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-600">
          <div className="w-3 h-3 rounded-full bg-slate-800 border border-white" />
          <span>Major Focus Cities</span>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;