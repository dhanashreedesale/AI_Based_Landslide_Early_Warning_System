import { motion } from 'framer-motion';
import { AlertTriangle, Droplets, ChevronRight, MapPin } from 'lucide-react';
import { useMapStore } from '../../store';

interface Alert {
  id: string;
  title: string;
  location: string;
  state: string;
  type: 'critical' | 'warning' | 'info';
  description: string;
  time: string;
  metrics?: {
    rainfall?: number;
    soilMoisture?: number;
    deformation?: number;
  };
}

const AlertList = () => {
  const { selectedRegions } = useMapStore();

  const allAlerts: Alert[] = [
    {
      id: '1',
      title: 'Landslide Imminent - Slope Subsidence',
      location: 'Joshimath Sector (Chamoli)',
      state: 'Uttarakhand',
      type: 'critical',
      description: '24h rainfall 168mm exceeds 80mm threshold. Deformation rate -16.5mm/day',
      time: '2m ago',
      metrics: { rainfall: 168, deformation: -16.5 },
    },
    {
      id: '2',
      title: 'Escarpment Failure Warning',
      location: 'Sohra / Cherrapunji Escarpment',
      state: 'Meghalaya',
      type: 'critical',
      description: 'Torrential downpour 215mm/24h. Soil saturation at 91%',
      time: '5m ago',
      metrics: { rainfall: 215, soilMoisture: 91 },
    },
    {
      id: '3',
      title: 'Highway Cutting Rockfall Alert',
      location: 'Kullu-Manali Valley Corridor',
      state: 'Himachal Pradesh',
      type: 'warning',
      description: 'Beas River bank erosion leading to structural slumping on NH-3',
      time: '12m ago',
      metrics: { rainfall: 175, deformation: -15.1 },
    },
    {
      id: '4',
      title: 'Shooting Stones & Mudslide Hazard',
      location: 'Ramban-Banihal NH-44 Sector',
      state: 'Jammu & Kashmir',
      type: 'critical',
      description: 'Piezometer pressure spiked 40%. Slope displacement detected',
      time: '25m ago',
      metrics: { rainfall: 160, soilMoisture: 81 },
    },
    {
      id: '5',
      title: 'Urban Ridge Saturation Advisory',
      location: 'Gangtok-Pakyong Urban Slope',
      state: 'Sikkim',
      type: 'warning',
      description: 'Debris flow probability elevated following prolonged precipitation',
      time: '38m ago',
      metrics: { rainfall: 190, soilMoisture: 88 },
    },
    {
      id: '6',
      title: 'Railway Line Slope Shear',
      location: 'Haflong-Jatinga Ridge (Dima Hasao)',
      state: 'Assam',
      type: 'warning',
      description: 'InSAR satellite detected -13.5mm ground deformation',
      time: '50m ago',
      metrics: { rainfall: 165, deformation: -13.5 },
    },
    {
      id: '7',
      title: 'Active Slope Creep Warning',
      location: 'Aizawl City Ridge Slopes',
      state: 'Mizoram',
      type: 'warning',
      description: 'Structural building cracks reported on steep ridge terrain',
      time: '1h ago',
      metrics: { rainfall: 155, soilMoisture: 81 },
    },
    {
      id: '8',
      title: 'Highland Border Road Advisory',
      location: 'Tawang-Sela Pass Sector',
      state: 'Arunachal Pradesh',
      type: 'info',
      description: 'Minor rockfall on high altitude access corridor',
      time: '2h ago',
      metrics: { rainfall: 152 },
    },
  ];

  // Filter alerts based on active focus regions selection
  const filteredAlerts = allAlerts.filter((alert) => selectedRegions.includes(alert.state));

  const getTypeStyles = (type: string) => {
    const styles = {
      critical: 'bg-red-50 border-red-200 text-red-700',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      info: 'bg-blue-50 border-blue-200 text-blue-700',
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  return (
    <div className="space-y-2 p-3 custom-scrollbar">
      {filteredAlerts.length === 0 ? (
        <div className="p-6 text-center text-gray-500 text-sm">
          No active alerts for currently selected regions. Select focus regions above to view live alerts.
        </div>
      ) : (
        filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-lg border ${getTypeStyles(alert.type)} cursor-pointer hover:shadow-sm transition-all`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-bold text-xs text-gray-900 leading-snug">{alert.title}</h4>
                  <span className="text-[10px] font-semibold text-gray-500 whitespace-nowrap">{alert.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-gray-700">
                  <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  <span>{alert.location}</span>
                  <span className="text-gray-400">•</span>
                  <span className="font-bold text-blue-700">{alert.state}</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">{alert.description}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px]">
                  {alert.metrics?.rainfall && (
                    <div className="flex items-center gap-1 text-blue-700 font-semibold">
                      <Droplets className="w-3 h-3" />
                      <span>{alert.metrics.rainfall}mm/24h</span>
                    </div>
                  )}
                  {alert.metrics?.soilMoisture && (
                    <div className="flex items-center gap-1 text-green-700 font-semibold">
                      <span>Soil: {alert.metrics.soilMoisture}%</span>
                    </div>
                  )}
                  {alert.metrics?.deformation && (
                    <div className="flex items-center gap-1 text-red-700 font-semibold">
                      <span>Deform: {alert.metrics.deformation}mm</span>
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default AlertList;