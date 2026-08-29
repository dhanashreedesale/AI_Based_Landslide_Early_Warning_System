import { useState, useMemo } from 'react';
import { Database, Activity, RefreshCw, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n';

interface DataSource {
  id: string;
  nameKey: string;
  type: 'satellite' | 'weather' | 'terrain' | 'seismic';
  status: 'live' | 'mock' | 'offline';
  lastUpdate: string;
  descKey: string;
  icon: string;
}

const DataSourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { t } = useTranslation();

  const dataSources: DataSource[] = [
    {
      id: '1',
      nameKey: 'dataSources.srcSentinel2Name',
      type: 'satellite',
      status: 'live',
      lastUpdate: '2 min ago',
      descKey: 'dataSources.srcSentinel2Desc',
      icon: '🛰️',
    },
    {
      id: '2',
      nameKey: 'dataSources.srcSentinel1Name',
      type: 'satellite',
      status: 'mock',
      lastUpdate: '15 min ago',
      descKey: 'dataSources.srcSentinel1Desc',
      icon: '📡',
    },
    {
      id: '3',
      nameKey: 'dataSources.srcIMDRainfallName',
      type: 'weather',
      status: 'live',
      lastUpdate: '5 min ago',
      descKey: 'dataSources.srcIMDRainfallDesc',
      icon: '🌧️',
    },
    {
      id: '4',
      nameKey: 'dataSources.srcDEMTerrainName',
      type: 'terrain',
      status: 'live',
      lastUpdate: '1 hour ago',
      descKey: 'dataSources.srcDEMTerrainDesc',
      icon: '🏔️',
    },
    {
      id: '5',
      nameKey: 'dataSources.srcSoilMoistureName',
      type: 'weather',
      status: 'mock',
      lastUpdate: '30 min ago',
      descKey: 'dataSources.srcSoilMoistureDesc',
      icon: '💧',
    },
    {
      id: '6',
      nameKey: 'dataSources.srcGeologyName',
      type: 'terrain',
      status: 'mock',
      lastUpdate: '1 day ago',
      descKey: 'dataSources.srcGeologyDesc',
      icon: '🔬',
    },
    {
      id: '7',
      nameKey: 'dataSources.srcSeismicityName',
      type: 'seismic',
      status: 'mock',
      lastUpdate: '10 min ago',
      descKey: 'dataSources.srcSeismicityDesc',
      icon: '🌍',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'mock':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return t('dataSources.statusLive');
      case 'mock':
        return t('dataSources.statusMock');
      case 'offline':
        return t('dataSources.statusOffline');
      default:
        return t('common.unknown');
    }
  };

  const filteredSources = useMemo(() => {
    return dataSources.filter((source) => {
      const name = t(source.nameKey);
      const desc = t(source.descKey);
      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || source.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType, t]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-light-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
              <Database className="w-6 h-6 text-blue-600" />
              {t('dataSources.pageTitle')}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {t('dataSources.pageSubtitle')}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-xs font-semibold text-sm">
            <RefreshCw className="w-4 h-4" />
            {t('common.refreshAll')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-light-200 p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('dataSources.searchPlaceholder')}
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
              <option value="all">{t('dataSources.typeAll')}</option>
              <option value="satellite">{t('dataSources.typeSatellite')}</option>
              <option value="weather">{t('dataSources.typeWeather')}</option>
              <option value="terrain">{t('dataSources.typeTerrain')}</option>
              <option value="seismic">{t('dataSources.typeSeismic')}</option>
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
            className="bg-white rounded-xl border border-light-200 p-6 hover:border-light-300 transition-all shadow-xs hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{source.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{t(source.nameKey)}</h3>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full mt-1 font-semibold ${
                      source.status === 'live'
                        ? 'bg-green-50 text-green-700'
                        : source.status === 'mock'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {getStatusIcon(source.status)}
                    {getStatusText(source.status)}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{source.lastUpdate}</span>
            </div>
            <p className="text-sm text-gray-600 mt-3">{t(source.descKey)}</p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-light-100 hover:bg-light-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium">
                {t('common.viewDetails')}
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