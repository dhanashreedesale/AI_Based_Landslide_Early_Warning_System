import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Droplets, ChevronRight } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  location: string;
  type: 'critical' | 'warning' | 'info';
  description: string;
  time: string;
  metrics?: {
    rainfall?: number;
    soilMoisture?: number;
  };
}

const AlertList = () => {
  const alerts: Alert[] = [
    {
      id: '1',
      title: 'Landslide Imminent',
      location: 'Sonapur Ridge',
      type: 'critical',
      description: 'Rainfall 100mm/24h exceeds threshold 80mm',
      time: '2m ago',
      metrics: { rainfall: 100 }
    },
    {
      id: '2',
      title: 'High Risk Detected',
      location: 'Khali Slope-4',
      type: 'warning',
      description: 'Rainfall 100mm/24h exceeds threshold 80mm',
      time: '1m ago',
      metrics: { rainfall: 100 }
    },
    {
      id: '3',
      title: 'Soil Moisture Warning',
      location: 'Barapani Basin',
      type: 'warning',
      description: 'Soil saturation at critical levels',
      time: '0.5m ago',
      metrics: { soilMoisture: 82 }
    },
    {
      id: '4',
      title: 'High Risk Detected',
      location: 'Nongkrem West',
      type: 'info',
      description: 'Rainfall 100mm/24h exceeds threshold 80mm',
      time: '0.5m ago',
      metrics: { rainfall: 100 }
    }
  ];

  const getTypeStyles = (type: string) => {
    const styles = {
      critical: 'bg-red-50 border-red-200 text-red-700',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      info: 'bg-blue-50 border-blue-200 text-blue-700'
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  return (
    <div className="space-y-2 p-2 custom-scrollbar">
      {alerts.map((alert, index) => (
        <motion.div
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-3 rounded-lg border ${getTypeStyles(alert.type)} cursor-pointer hover:bg-opacity-30 transition-all`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-sm text-gray-900">{alert.title}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{alert.location}</p>
              <p className="text-xs text-gray-500 mt-1">{alert.description}</p>
              {alert.metrics?.rainfall && (
                <div className="flex items-center gap-1 mt-2">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-gray-600">{alert.metrics.rainfall}mm/24h</span>
                </div>
              )}
              {alert.metrics?.soilMoisture && (
                <div className="flex items-center gap-1 mt-2">
                  <Droplets className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-gray-600">Soil Moisture: {alert.metrics.soilMoisture}%</span>
                </div>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AlertList;