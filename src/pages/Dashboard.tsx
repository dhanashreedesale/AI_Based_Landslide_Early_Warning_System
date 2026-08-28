import { useState } from 'react';
import { AlertTriangle, MapPin, Clock, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import RiskMap from '../components/Dashboard/RiskMap';
import AlertList from '../components/Dashboard/AlertList';
import RainfallChart from '../components/Dashboard/RainfallChart';
import { RegionFilterControl } from '../components/Dashboard/RegionFilterControl';
import { useMapStore } from '../store';
import { DEFAULT_FOCUS_REGIONS } from '../data/focusRegionsData';

const Dashboard = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const { selectedRegions } = useMapStore();

  const isAllDefaultSelected =
    selectedRegions.length === DEFAULT_FOCUS_REGIONS.length &&
    DEFAULT_FOCUS_REGIONS.every((r) => selectedRegions.includes(r));

  const stats = [
    {
      id: 'alerts',
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: '8',
      change: '+3',
      changeType: 'up' as const,
      color: 'red' as const,
      details: [
        '2 Severe - Joshimath (Uttarakhand) & Sohra (Meghalaya)',
        '3 High - Kullu (HP), Ramban (J&K) & Gangtok (Sikkim)',
        '3 Medium - Haflong (Assam), Tamenglong (Manipur) & Aizawl (Mizoram)',
      ],
    },
    {
      id: 'zones',
      icon: MapPin,
      label: 'High-Risk Zones',
      value: '14',
      change: '+2',
      changeType: 'up' as const,
      color: 'orange' as const,
      details: [
        'Uttarakhand: Joshimath, Kedarnath Valley, Dharchula',
        'Himachal Pradesh: Kullu-Manali, Shimla, Kinnaur',
        'Jammu & Kashmir: Ramban-Banihal, Reasi',
        'Sikkim & NE: Gangtok, Tawang, Cherrapunji, Tamenglong, Aizawl',
      ],
    },
    {
      id: 'regions',
      icon: ShieldCheck,
      label: 'Focus Regions',
      value: `${selectedRegions.length} / 12`,
      change: isAllDefaultSelected ? 'Default Active' : 'Filtered',
      changeType: 'neutral' as const,
      color: 'blue' as const,
      details: DEFAULT_FOCUS_REGIONS.map((region) =>
        selectedRegions.includes(region) ? `✓ ${region} (Active)` : `✗ ${region} (Inactive)`
      ),
    },
    {
      id: 'sync',
      icon: Clock,
      label: 'Data Sync & Sensors',
      value: 'Live',
      change: '100% Operational',
      changeType: 'neutral' as const,
      color: 'green' as const,
      details: [
        'Sentinel-1 / Sentinel-2 InSAR: Active',
        'IMD High-Resolution Rainfall: Live',
        'ALOS PALSAR DEM & Geological Maps: Loaded',
        'Ground Piezometer & Inclinometer: Online',
      ],
    },
  ];

  return (
    <div className="space-y-5">
      {/* Default Focus Regions Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl p-4 shadow-md border border-blue-800/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30 text-blue-300">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white">Default Focus Regions Active</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-300 border border-green-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-green-400" /> 12 Selected by Default
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Primary landslide monitoring active for Uttarakhand, Himachal Pradesh, Jammu & Kashmir, Ladakh, Sikkim, Arunachal Pradesh, Assam, Meghalaya, Nagaland, Manipur, Mizoram & Tripura.
            </p>
          </div>
        </div>

        <RegionFilterControl />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            stat={stat}
            isOpen={selectedStat === stat.id}
            onToggle={() => setSelectedStat(selectedStat === stat.id ? null : stat.id)}
          />
        ))}
      </div>

      {/* Main Map & Live Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 border-b border-light-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
            <div>
              <h2 className="text-base font-bold flex items-center gap-2 text-gray-900">
                <MapPin className="w-5 h-5 text-blue-600" />
                Live Risk Map — Himalayan & Northeast Landslide Belt
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Default monitoring enabled for 12 primary landslide risk states & UTs
              </p>
            </div>

            <RegionFilterControl />
          </div>

          <div className="h-[520px] relative w-full">
            <RiskMap />
          </div>
        </div>

        {/* Live Alerts Column */}
        <div className="bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 border-b border-light-200 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-base font-bold flex items-center gap-2 text-gray-900">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Live Risk Alerts
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Focus regions telemetry alerts</p>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full animate-pulse">
              ● 8 Active
            </span>
          </div>

          <div className="h-[520px] overflow-y-auto custom-scrollbar">
            <AlertList />
          </div>
        </div>
      </div>

      {/* 7-Day Rainfall Chart Section */}
      <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              7-Day Cumulative Rainfall vs. Landslide Trigger Threshold
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Aggregated IMD satellite rainfall across Himalayan & Northeast focus regions
            </p>
          </div>

          <div className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
            Critical Threshold: <span className="font-bold text-red-600">80mm / 24h</span>
          </div>
        </div>

        <div className="h-[220px]">
          <RainfallChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;