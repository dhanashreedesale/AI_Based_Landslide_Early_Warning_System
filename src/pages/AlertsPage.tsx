import { useState } from 'react';
import { AlertTriangle, Filter, Search, Clock, MapPin, ChevronDown, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import { useMapStore, useAlertStore } from '../store';
import { useTranslation } from '../i18n';

const AlertsPage = () => {
  const { selectedRegions } = useMapStore();
  const { alerts, resolveAlert, acknowledgeAlert, resetAlerts } = useAlertStore();
  const { t, tRegion, tHazardLevel } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    const matchesRegion = selectedRegions.includes(alert.state);
    const matchesSearch =
      searchQuery === '' ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return t('alerts.statusActive');
      case 'acknowledged':
        return t('alerts.statusAcknowledged');
      case 'resolving':
        return 'Resolving & Removing...';
      case 'resolved':
        return t('alerts.statusResolved');
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-light-200 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                {t('alerts.pageTitle')}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                {filteredAlerts.length} Active
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {t('alerts.pageSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-light-50 rounded-lg px-3 py-2 border border-light-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('alerts.searchPlaceholder')}
                className="bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              />
            </div>
            <button
              onClick={resetAlerts}
              className="flex items-center gap-1.5 px-3 py-2 bg-light-50 hover:bg-light-100 border border-light-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reload Demo
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-light-50 border border-light-200 rounded-lg text-sm text-gray-700 hover:bg-light-100 transition-colors">
              <Filter className="w-4 h-4" />
              {t('common.filter')}
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-light-200 overflow-hidden shadow-xs">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">{t('alerts.noActiveAlerts')}</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              All telemetry hazards across your selected focus regions have been resolved and automatically cleared.
            </p>
            <button
              onClick={resetAlerts}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reload Focus Regions Alerts
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light-50 border-b border-light-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('alerts.colSeverity')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('alerts.colTitle')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('alerts.colState')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('alerts.colLocation')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('alerts.colTime')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('alerts.colStatus')}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-200">
                {filteredAlerts.map((alert) => {
                  const isResolving = alert.status === 'resolving';

                  return (
                    <tr
                      key={alert.id}
                      className={`hover:bg-light-50 transition-colors ${
                        isResolving ? 'bg-green-50/70 opacity-70' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            alert.severity === 'critical'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : alert.severity === 'high'
                              ? 'bg-orange-50 text-orange-700 border border-orange-200'
                              : alert.severity === 'medium'
                              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {tHazardLevel(alert.severity === 'critical' ? 'severe' : alert.severity)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        <div>{alert.title}</div>
                        <div className="text-xs text-gray-500 font-normal mt-0.5">{alert.description}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-700">
                        <span className="inline-flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded text-xs font-semibold">
                          <ShieldCheck className="w-3 h-3 text-blue-600" />
                          {tRegion(alert.state)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {alert.location}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {alert.time}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            isResolving
                              ? 'bg-green-100 text-green-800'
                              : alert.status === 'active'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : alert.status === 'acknowledged'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isResolving
                                ? 'bg-green-600 animate-spin'
                                : alert.status === 'active'
                                ? 'bg-red-500 animate-pulse'
                                : 'bg-yellow-500'
                            }`}
                          />
                          {getStatusLabel(alert.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {alert.status === 'active' && (
                            <button
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="px-2.5 py-1 bg-light-100 hover:bg-light-200 text-gray-700 rounded-md text-xs font-semibold transition-colors"
                            >
                              Acknowledge
                            </button>
                          )}
                          <button
                            disabled={isResolving}
                            onClick={() => resolveAlert(alert.id, 700)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                              isResolving
                                ? 'bg-green-600 text-white cursor-wait'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs active:scale-95'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {isResolving ? 'Resolving...' : 'Resolve Issue'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;