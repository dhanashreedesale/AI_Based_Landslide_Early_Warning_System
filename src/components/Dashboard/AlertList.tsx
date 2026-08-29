import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Droplets, MapPin, CheckCircle2, RotateCcw } from 'lucide-react';
import { useMapStore, useAlertStore } from '../../store';
import { useTranslation } from '../../i18n';

const AlertList = () => {
  const { selectedRegions } = useMapStore();
  const { alerts, resolveAlert, resetAlerts } = useAlertStore();
  const { t, tRegion } = useTranslation();

  // Filter alerts based on active focus regions selection
  const filteredAlerts = alerts.filter((alert) => selectedRegions.includes(alert.state));

  const getTypeStyles = (type: string, status?: string) => {
    if (status === 'resolving') {
      return 'bg-green-50 border-green-300 text-green-800 ring-2 ring-green-400';
    }
    const styles = {
      critical: 'bg-red-50/80 border-red-200 text-red-700',
      warning: 'bg-yellow-50/80 border-yellow-200 text-yellow-700',
      info: 'bg-blue-50/80 border-blue-200 text-blue-700',
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  return (
    <div className="space-y-2.5 p-3 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {filteredAlerts.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 text-center bg-gray-50/60 rounded-xl border border-dashed border-gray-200"
          >
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-gray-800">
              {t('alerts.noActiveAlerts')}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              All telemetry hazards have been addressed and cleared.
            </p>
            <button
              onClick={resetAlerts}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reload Demo Alerts
            </button>
          </motion.div>
        ) : (
          filteredAlerts.map((alert, index) => {
            const isResolving = alert.status === 'resolving';

            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: 30,
                  scale: 0.92,
                  height: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  transition: { duration: 0.35 },
                }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={`p-3 rounded-lg border ${getTypeStyles(alert.type, alert.status)} hover:shadow-xs transition-all`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">
                    {isResolving ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600 animate-spin" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-gray-900 leading-snug">
                        {alert.title}
                      </h4>
                      <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">
                        {alert.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-gray-700">
                      <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      <span>{alert.location}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-bold text-blue-700">{tRegion(alert.state)}</span>
                    </div>

                    <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                      {alert.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-black/5">
                      <div className="flex flex-wrap items-center gap-3 text-[11px]">
                        {alert.metrics?.rainfall && (
                          <div className="flex items-center gap-1 text-blue-700 font-semibold">
                            <Droplets className="w-3 h-3" />
                            <span>{alert.metrics.rainfall}mm/24h</span>
                          </div>
                        )}
                        {alert.metrics?.soilMoisture && (
                          <div className="flex items-center gap-1 text-green-700 font-semibold">
                            <span>{t('alerts.soilLabel')} {alert.metrics.soilMoisture}%</span>
                          </div>
                        )}
                        {alert.metrics?.deformation && (
                          <div className="flex items-center gap-1 text-red-700 font-semibold">
                            <span>{t('alerts.deformLabel')} {alert.metrics.deformation}mm</span>
                          </div>
                        )}
                      </div>

                      {/* Resolve Action Button with Auto-removal */}
                      <button
                        disabled={isResolving}
                        onClick={() => resolveAlert(alert.id, 650)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                          isResolving
                            ? 'bg-green-600 text-white cursor-wait'
                            : 'bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border border-gray-300 hover:border-green-400 shadow-2xs active:scale-95'
                        }`}
                        title="Resolve hazard issue and automatically remove from active alerts"
                      >
                        <CheckCircle2 className={`w-3 h-3 ${isResolving ? 'animate-spin' : 'text-green-600'}`} />
                        <span>{isResolving ? 'Resolving & Clearing...' : 'Resolve Issue'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertList;