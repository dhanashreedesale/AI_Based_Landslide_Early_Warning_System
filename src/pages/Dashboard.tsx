import { useState } from 'react';
import { AlertTriangle, MapPin, Clock, TrendingUp, Layers } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import RiskMap from '../components/Dashboard/RiskMap';
import RiskHeatmap from '../components/Dashboard/RiskHeatmap';
import AlertList from '../components/Dashboard/AlertList';
import RainfallChart from '../components/Dashboard/RainfallChart';

const Dashboard = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'polygon' | 'heatmap'>('polygon');

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
      details: ['East Khasi Hills', 'West Garo Hills', 'Dima Hasao', 'Karbi Anglong', 'Cachar', 'Goalpara']
    },
    {
      id: 'sync',
      icon: Clock,
      label: 'Last Data Sync',
      value: '01:00 PM',
      change: 'Live',
      changeType: 'neutral' as const,
      color: 'green' as const,
      details: ['Sentinel-2: Live', 'IMD Rainfall: Live', 'DEM Terrain: Live']
    }
  ];

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-20">
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
        {/* Map Container */}
        <div className="lg:col-span-2 bg-dark-800 rounded-xl border border-dark-700 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-dark-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5 text-yellow-500" />
              Live Risk Map — Northeast India
            </h2>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-dark-700 rounded-lg p-1">
              <button
                onClick={() => setMapView('heatmap')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  mapView === 'heatmap' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-600'
                }`}
              >
                <Layers className="w-4 h-4" />
                Heatmap
              </button>
              <button
                onClick={() => setMapView('polygon')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  mapView === 'polygon' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Zones
              </button>
            </div>
          </div>
          
          <div className="h-[500px] relative">
            {mapView === 'heatmap' ? (
              <RiskHeatmap />
            ) : (
              <RiskMap />
            )}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-dark-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Live Alerts
            </h2>
            <span className="text-xs text-red-400 animate-pulse">● 4 active</span>
          </div>
          <div className="h-[468px] overflow-y-auto custom-scrollbar">
            <AlertList />
          </div>
        </div>
      </div>

      {/* Rainfall Chart */}
      <div className="bg-dark-800 rounded-xl border border-dark-700 p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-blue-400" />
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