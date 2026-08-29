import { useState } from 'react';
import { AlertTriangle, MapPin, Clock, TrendingUp, ShieldCheck, CheckCircle2, SlidersHorizontal, Info } from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import RiskMap from '../components/Dashboard/RiskMap';
import AlertList from '../components/Dashboard/AlertList';
import RainfallChart from '../components/Dashboard/RainfallChart';
import { RegionFilterControl } from '../components/Dashboard/RegionFilterControl';
import { useMapStore, useAlertStore } from '../store';
import { DEFAULT_FOCUS_REGIONS, getRegionRainfallData, FocusRegionName } from '../data/focusRegionsData';
import { useTranslation } from '../i18n';

const Dashboard = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const { selectedRegions, activeChartRegion, setActiveChartRegion } = useMapStore();
  const { alerts } = useAlertStore();
  const { t, tRegion } = useTranslation();

  const isAllDefaultSelected =
    selectedRegions.length === DEFAULT_FOCUS_REGIONS.length &&
    DEFAULT_FOCUS_REGIONS.every((r) => selectedRegions.includes(r));

  // Dynamically count active alerts filtered by selected regions
  const activeAlertsForRegions = alerts.filter((alert) => selectedRegions.includes(alert.state));
  const activeCount = activeAlertsForRegions.length;

  const currentChartProfile = getRegionRainfallData(activeChartRegion, selectedRegions);

  const stats = [
    {
      id: 'alerts',
      icon: AlertTriangle,
      label: t('dashboard.activeAlertsLabel'),
      value: String(activeCount),
      change: activeCount > 0 ? `${activeCount} Live` : 'All Cleared',
      changeType: activeCount > 0 ? ('up' as const) : ('neutral' as const),
      color: activeCount > 0 ? ('red' as const) : ('green' as const),
      details:
        activeCount > 0
          ? activeAlertsForRegions.map(
              (a) => `• ${a.title} - ${a.location} (${tRegion(a.state)})`
            )
          : ['✓ All active landslide telemetry issues have been resolved and cleared.'],
    },
    {
      id: 'zones',
      icon: MapPin,
      label: t('dashboard.highRiskZonesLabel'),
      value: '14',
      change: '+2',
      changeType: 'up' as const,
      color: 'orange' as const,
      details: [
        t('statsDetails.zonesUttarakhand'),
        t('statsDetails.zonesHimachal'),
        t('statsDetails.zonesJK'),
        t('statsDetails.zonesSikkimNE'),
      ],
    },
    {
      id: 'regions',
      icon: ShieldCheck,
      label: t('dashboard.focusRegionsLabel'),
      value: `${selectedRegions.length} / 12`,
      change: isAllDefaultSelected ? t('dashboard.defaultActive') : t('dashboard.filtered'),
      changeType: 'neutral' as const,
      color: 'blue' as const,
      details: DEFAULT_FOCUS_REGIONS.map((region) =>
        selectedRegions.includes(region)
          ? `✓ ${tRegion(region)} (${t('common.active')})`
          : `✗ ${tRegion(region)} (${t('common.inactive')})`
      ),
    },
    {
      id: 'sync',
      icon: Clock,
      label: t('dashboard.dataSyncLabel'),
      value: t('common.live'),
      change: t('dashboard.operational100'),
      changeType: 'neutral' as const,
      color: 'green' as const,
      details: [
        t('statsDetails.sensorInSAR'),
        t('statsDetails.sensorIMD'),
        t('statsDetails.sensorDEM'),
        t('statsDetails.sensorGround'),
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
              <h2 className="font-bold text-base text-white">{t('dashboard.bannerTitle')}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/20 text-green-300 border border-green-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-green-400" /> {t('dashboard.bannerBadge')}
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              {t('dashboard.bannerDescription')}
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
                {t('dashboard.liveMapTitle')}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {t('dashboard.liveMapSubtitle')}
              </p>
            </div>

            <RegionFilterControl />
          </div>

          <div className="h-[520px] relative w-full">
            <RiskMap />
          </div>
        </div>

        {/* Live Alerts Column with Automatic Resolution Handling */}
        <div className="bg-white rounded-xl border border-light-200 overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 border-b border-light-200 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-base font-bold flex items-center gap-2 text-gray-900">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                {t('dashboard.liveAlertsTitle')}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{t('dashboard.liveAlertsSubtitle')}</p>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                activeCount > 0
                  ? 'text-red-600 bg-red-50 border border-red-200 animate-pulse'
                  : 'text-green-700 bg-green-50 border border-green-200'
              }`}
            >
              ● {activeCount} {t('common.active')}
            </span>
          </div>

          <div className="h-[520px] overflow-y-auto custom-scrollbar">
            <AlertList />
          </div>
        </div>
      </div>

      {/* 7-Day Rainfall Chart Section with Region-Specific Thresholds */}
      <div className="bg-white rounded-xl border border-light-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {t('dashboard.rainfallChartTitle')}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('dashboard.rainfallChartSubtitle')}
            </p>
          </div>

          {/* Interactive Region Selector for Specific Threshold */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold text-gray-500">Threshold Region:</span>
              <select
                value={activeChartRegion}
                onChange={(e) => setActiveChartRegion(e.target.value as FocusRegionName | 'all')}
                className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="all">🌐 Aggregated (All 12 Regions)</option>
                {DEFAULT_FOCUS_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {tRegion(r)} — Threshold: {getRegionRainfallData(r).threshold}mm
                  </option>
                ))}
              </select>
            </div>

            {/* Dynamic Critical Threshold Badge */}
            <div className="text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 bg-red-50 text-red-700 border-red-200">
              <span>
                {activeChartRegion === 'all'
                  ? `Avg Trigger Threshold:`
                  : `${tRegion(activeChartRegion)} Threshold:`}
              </span>
              <span className="font-extrabold text-red-800 text-sm">
                {currentChartProfile.threshold} mm / 24h
              </span>
            </div>
          </div>
        </div>

        {/* Geological Trigger Insight Callout */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-2.5 flex items-start gap-2 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">
              {activeChartRegion === 'all'
                ? 'Regional Geological Sensitivity:'
                : `${tRegion(activeChartRegion)} Terrain & Trigger Mechanism:`}{' '}
            </span>
            <span className="text-blue-800">{currentChartProfile.geologySummary}</span>
            <span className="ml-1 text-blue-600 font-medium">({currentChartProfile.terrain})</span>
          </div>
        </div>

        <div className="h-[250px]">
          <RainfallChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;