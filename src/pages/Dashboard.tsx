import { useState } from 'react';
import { AlertTriangle, MapPin, Clock, TrendingUp } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import RiskMap from '../components/Dashboard/RiskMap';
import AlertList from '../components/Dashboard/AlertList';
import RainfallChart from '../components/Dashboard/RainfallChart';

const Dashboard = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const stats = [
    {
      id: 'alerts',
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: '4',
      change: '+2',
      changeType: 'up' as const,
      color: 'red' as const,
      details: ['1 Severe - East Khasi Hills', '1 High - West Garo Hills', '2 Medium - Dima Hasao, Karbi Anglong']
    },
    {
      id: 'zones',
      icon: MapPin,
      label: 'High-Risk Zones',
      value: '2',
      change: '+1',
      changeType: 'up' as const,
      color: 'orange' as const,
      details: ['East Khasi Hills - Severe Risk', 'West Garo Hills - High Risk']
    },
    {
      id: 'districts',
      icon: MapPin,
      label: 'Districts Monitored',
      value: '12',
      change: '+2',
      changeType: 'up' as const,
      color: 'blue' as const,
      details: ['East Khasi Hills', 'West Garo Hills', 'Dima Hasao', 'Karbi Anglong', 'Cachar', 'Goalpara', 'Hailakandi', 'Karimganj', 'Nagaon', 'Morigaon', 'Kamrup', 'Sonitpur']
    },
    {
      id: 'sync',
      icon: Clock,
      label: 'Last Data Sync',
      value: '01:00 PM',
      change: 'Live',
      changeType: 'neutral' as const,
      color: 'green' as const,
      details: ['Sentinel-2: Live', 'IMD Rainfall: Live', 'DEM Terrain: Live', 'Soil Moisture: Mock', 'Geology: Mock']
    }
  ];

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
        <div className="lg:col-span-2 bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-light-200">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              <MapPin className="w-5 h-5 text-blue-600" />
              Live Risk Map — Northeast India
            </h2>
          </div>
          <div className="h-[500px] relative">
            <RiskMap />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-light-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Live Alerts
            </h2>
            <span className="text-xs text-red-600 animate-pulse">● 4 active</span>
          </div>
          <div className="h-[500px] overflow-y-auto custom-scrollbar">
            <AlertList />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          7-Day Rainfall vs. Trigger Threshold
        </h2>
        <div className="h-[200px]">
          <RainfallChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;