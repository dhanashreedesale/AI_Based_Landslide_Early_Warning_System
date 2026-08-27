import { useState } from 'react';
import { Database, Activity, RefreshCw, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface DataSource {
  id: string;
  name: string;
  type: 'satellite' | 'weather' | 'terrain' | 'seismic';
  status: 'live' | 'mock' | 'offline';
  lastUpdate: string;
  description: string;
  icon: string;
}

const DataSourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const dataSources: DataSource[] = [
    {
      id: '1',
      name: 'Sentinel-2 Optical',
      type: 'satellite',
      status: 'live',
      lastUpdate: '2 min ago',
      description: 'High-resolution optical imagery for vegetation analysis',
      icon: '🛰️'
    },
    {
      id: '2',
      name: 'Sentinel-1 SAR',
      type: 'satellite',
      status: 'mock',
      lastUpdate: '15 min ago',
      description: 'Cloud-penetrating radar for deformation monitoring',
      icon: '📡'
    },
    {
      id: '3',
      name: 'IMD Rainfall',
      type: 'weather',
      status: 'live',
      lastUpdate: '5 min ago',
      description: 'Real-time rainfall data from IMD weather stations',
      icon: '🌧️'
    },
    {
      id: '4',
      name: 'DEM Terrain',
      type: 'terrain',
      status: 'live',
      lastUpdate: '1 hour ago',
      description: 'Digital Elevation Model for slope analysis',
      icon: '🏔️'
    },
    {
      id: '5',
      name: 'Soil Moisture',
      type: 'weather',
      status: 'mock',
      lastUpdate: '30 min ago',
      description: 'Soil moisture levels from SMAP and ESA CCI',
      icon: '💧'
    },
    {
      id: '6',
      name: 'Geology',
      type: 'terrain',
      status: 'mock',
      lastUpdate: '1 day ago',
      description: 'Geological Survey of India lithology data',
      icon: '🔬'
    },
    {
      id: '7',
      name: 'Seismicity',
      type: 'seismic',
      status: 'mock',
      lastUpdate: '10 min ago',
      description: 'USGS and NCS India seismic activity data',
      icon: '🌍'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'mock': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'offline': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live Data';
      case 'mock': return 'Mock Data';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const filteredSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          source.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || source.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-light-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <Database className="w-6 h-6 text-blue-600" />
              Data Sources
            </h2>
            <p className="text-sm text-gray-500 mt-1">Monitor and manage all data sources</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-light-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search data sources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-light-50 border border-light-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="satellite">Satellite</option>
              <option value="weather">Weather</option>
              <option value="terrain">Terrain</option>
              <option value="seismic">Seismic</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-light-200 p-6 hover:border-light-300 transition-all shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{source.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{source.name}</h3>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full mt-1 ${
                    source.status === 'live' ? 'bg-green-50 text-green-700' :
                    source.status === 'mock' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {getStatusIcon(source.status)}
                    {getStatusText(source.status)}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{source.lastUpdate}</span>
            </div>
            <p className="text-sm text-gray-600 mt-3">{source.description}</p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-light-100 hover:bg-light-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-colors">
                View Details
              </button>
              <button className="px-3 py-1.5 bg-light-100 hover:bg-light-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-colors">
                <Activity className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DataSourcesPage;