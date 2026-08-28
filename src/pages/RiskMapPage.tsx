import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Layers, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';
import { useMapStore } from '../store';
import { FOCUS_REGIONS_DATA, MAJOR_FOCUS_CITIES, DEFAULT_FOCUS_REGIONS } from '../data/focusRegionsData';
import { RegionFilterControl } from '../components/Dashboard/RegionFilterControl';

const RiskMapPage = () => {
  const { selectedRegions, center, zoom, resetToDefaultRegions } = useMapStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'severe' | 'high'>('all');

  const activeZones = useMemo(() => {
    return FOCUS_REGIONS_DATA.filter((zone) => {
      const matchesRegion = selectedRegions.includes(zone.state);
      const matchesSearch =
        searchQuery === '' ||
        zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        zone.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        zone.state.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLayer =
        selectedLayer === 'all' ||
        (selectedLayer === 'severe' && zone.riskLevel === 'severe') ||
        (selectedLayer === 'high' && (zone.riskLevel === 'severe' || zone.riskLevel === 'high'));
      return matchesRegion && matchesSearch && matchesLayer;
    });
  }, [selectedRegions, searchQuery, selectedLayer]);

  const activeCities = useMemo(() => {
    return MAJOR_FOCUS_CITIES.filter((city) => selectedRegions.includes(city.state));
  }, [selectedRegions]);

  const severeCount = activeZones.filter((z) => z.riskLevel === 'severe').length;
  const highCount = activeZones.filter((z) => z.riskLevel === 'high').length;

  const getRiskColor = (level: string) => {
    const colors = {
      low: '#22c55e',
      medium: '#f59e0b',
      high: '#ef4444',
      severe: '#dc2626',
    };
    return colors[level as keyof typeof colors] || '#6b7280';
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              Landslide Live Risk Map — National Focus Regions
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/40">
              12 Default Regions Active
            </span>
          </div>
          <p className="text-xs text-blue-200 mt-1">
            Covering primary high-hazard landslide belts in Uttarakhand, Himachal Pradesh, Jammu & Kashmir, Ladakh, Sikkim, Arunachal Pradesh, Assam, Meghalaya, Nagaland, Manipur, Mizoram & Tripura.
          </p>
        </div>

        <button
          onClick={resetToDefaultRegions}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-lg text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset 12 Focus Regions
        </button>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Selected Focus Regions</div>
          <div className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            <span>{selectedRegions.length} / {DEFAULT_FOCUS_REGIONS.length}</span>
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Active High Risk Zones</div>
          <div className="text-2xl font-bold text-red-600 flex items-center justify-between">
            <span>{severeCount + highCount}</span>
            <span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded">
              {severeCount} Severe
            </span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Active Telemetry Alerts</div>
          <div className="text-2xl font-bold text-yellow-600">8</div>
        </div>
        <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
          <div className="text-xs text-gray-500 font-medium font-medium">Monitored Districts</div>
          <div className="text-2xl font-bold text-blue-600">36</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district, state, or zone (e.g. Joshimath, Sohra, Kullu)..."
            className="bg-light-50 border border-light-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          />
        </div>

        <div className="flex items-center gap-3">
          <RegionFilterControl />

          <div className="flex items-center gap-1 bg-light-50 p-1 border border-light-300 rounded-lg">
            <button
              onClick={() => setSelectedLayer('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedLayer === 'all' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Zones ({activeZones.length})
            </button>
            <button
              onClick={() => setSelectedLayer('severe')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                selectedLayer === 'severe' ? 'bg-red-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Severe Only ({severeCount})
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Leaflet Map */}
      <div className="bg-white rounded-xl border border-light-200 overflow-hidden h-[600px] relative shadow-sm">
        <MapContainer
          key={`risk-map-page-${selectedRegions.length}`}
          center={center}
          zoom={zoom}
          className="h-full w-full"
          style={{ background: '#f0f2f5' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {activeZones.map((zone) => (
            <Polygon
              key={zone.id}
              positions={zone.coordinates as any}
              pathOptions={{
                fillColor: getRiskColor(zone.riskLevel),
                fillOpacity: 0.45,
                color: getRiskColor(zone.riskLevel),
                weight: 3,
                opacity: 0.85,
                dashArray: zone.riskLevel === 'severe' ? '6,4' : undefined,
              }}
            >
              <Popup>
                <div className="text-gray-900 min-w-[220px] bg-white rounded-lg p-2">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-1 mb-2">
                    <h3 className="font-bold text-sm text-gray-900">{zone.name}</h3>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                      style={{ backgroundColor: getRiskColor(zone.riskLevel) }}
                    >
                      {zone.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{zone.district}, {zone.state}</p>

                  <div className="mt-2 space-y-1 text-xs border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Risk Score</span>
                      <span className="font-bold text-gray-900">{zone.stats.riskScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rainfall</span>
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
                  <div className="mt-2 pt-1 border-t border-gray-100 text-[11px] font-medium text-red-700">
                    ⚠️ {zone.keyThreat}
                  </div>
                </div>
              </Popup>
            </Polygon>
          ))}

          {/* Major City Markers */}
          {activeCities.map((city, idx) => (
            <CircleMarker
              key={idx}
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
                <div className="text-gray-900 text-xs">
                  <strong>{city.name}</strong> ({city.state})
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-light-200 p-3 shadow-xl">
          <p className="text-xs text-gray-700 font-bold mb-1.5 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            Landslide Hazard Levels
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3.5 h-3.5 bg-red-600 rounded border border-red-700"></span>
              <span className="text-gray-700">Severe Hazard (≥85%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3.5 h-3.5 bg-orange-500 rounded border border-orange-600"></span>
              <span className="text-gray-700">High Hazard (70-84%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3.5 h-3.5 bg-amber-500 rounded border border-amber-600"></span>
              <span className="text-gray-700">Medium Hazard (50-69%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3.5 h-3.5 bg-emerald-500 rounded border border-emerald-600"></span>
              <span className="text-gray-700">Low Hazard (&lt;50%)</span>
            </div>
          </div>
        </div>

        {/* Info Overlay */}
        <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-light-200 p-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Showing {activeZones.length} landslide hazard zones across {selectedRegions.length} focus regions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMapPage;