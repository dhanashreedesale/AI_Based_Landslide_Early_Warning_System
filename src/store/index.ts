import { create } from 'zustand';
import { DEFAULT_FOCUS_REGIONS, FocusRegionName } from '../data/focusRegionsData';
import toast from 'react-hot-toast';

export interface TelemetryAlert {
  id: string;
  title: string;
  location: string;
  state: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'critical' | 'warning' | 'info';
  description: string;
  time: string;
  status: 'active' | 'acknowledged' | 'resolving' | 'resolved';
  metrics?: {
    rainfall?: number;
    soilMoisture?: number;
    deformation?: number;
  };
  resolvedAt?: string;
}

const INITIAL_ALERTS: TelemetryAlert[] = [
  {
    id: 'alert-1',
    title: 'Landslide Imminent - Slope Subsidence',
    location: 'Joshimath Sector (Chamoli)',
    state: 'Uttarakhand',
    severity: 'critical',
    type: 'critical',
    description: '24h rainfall 168mm exceeds 80mm threshold. Deformation rate -16.5mm/day',
    time: '2 min ago',
    status: 'active',
    metrics: { rainfall: 168, deformation: -16.5, soilMoisture: 84 },
  },
  {
    id: 'alert-2',
    title: 'Escarpment Failure Warning',
    location: 'Sohra / Cherrapunji Escarpment',
    state: 'Meghalaya',
    severity: 'critical',
    type: 'critical',
    description: 'Torrential downpour 215mm/24h. Soil saturation at 91%',
    time: '5 min ago',
    status: 'active',
    metrics: { rainfall: 215, soilMoisture: 91, deformation: -19.8 },
  },
  {
    id: 'alert-3',
    title: 'Highway Cutting Rockfall Alert',
    location: 'Kullu-Manali Valley Corridor',
    state: 'Himachal Pradesh',
    severity: 'high',
    type: 'warning',
    description: 'Beas River bank erosion leading to structural slumping on NH-3',
    time: '12 min ago',
    status: 'active',
    metrics: { rainfall: 175, deformation: -15.1, soilMoisture: 83 },
  },
  {
    id: 'alert-4',
    title: 'Shooting Stones & Mudslide Hazard',
    location: 'Ramban-Banihal NH-44 Sector',
    state: 'Jammu & Kashmir',
    severity: 'critical',
    type: 'critical',
    description: 'Piezometer pressure spiked 40%. Slope displacement detected',
    time: '25 min ago',
    status: 'active',
    metrics: { rainfall: 160, soilMoisture: 81, deformation: -14.8 },
  },
  {
    id: 'alert-5',
    title: 'Urban Ridge Saturation Advisory',
    location: 'Gangtok-Pakyong Urban Slope',
    state: 'Sikkim',
    severity: 'high',
    type: 'warning',
    description: 'Debris flow probability elevated following prolonged precipitation',
    time: '38 min ago',
    status: 'active',
    metrics: { rainfall: 190, soilMoisture: 88, deformation: -17.4 },
  },
  {
    id: 'alert-6',
    title: 'Railway Line Slope Shear',
    location: 'Haflong-Jatinga Ridge (Dima Hasao)',
    state: 'Assam',
    severity: 'medium',
    type: 'warning',
    description: 'InSAR satellite detected -13.5mm ground deformation',
    time: '50 min ago',
    status: 'active',
    metrics: { rainfall: 165, deformation: -13.5, soilMoisture: 82 },
  },
  {
    id: 'alert-7',
    title: 'Active Slope Creep Warning',
    location: 'Aizawl City Ridge Slopes',
    state: 'Mizoram',
    severity: 'high',
    type: 'warning',
    description: 'Structural building cracks reported on steep ridge terrain',
    time: '1 hour ago',
    status: 'active',
    metrics: { rainfall: 155, soilMoisture: 81, deformation: -12.1 },
  },
  {
    id: 'alert-8',
    title: 'Highland Border Road Advisory',
    location: 'Tawang-Sela Pass Sector',
    state: 'Arunachal Pradesh',
    severity: 'low',
    type: 'info',
    description: 'Minor rockfall on high altitude access corridor',
    time: '2 hours ago',
    status: 'active',
    metrics: { rainfall: 152, soilMoisture: 79, deformation: -10.8 },
  },
];

interface MapState {
  selectedZone: string | null;
  selectedRegions: string[];
  activeChartRegion: FocusRegionName | 'all';
  zoom: number;
  center: [number, number];
  layers: {
    rainfall: boolean;
    soilMoisture: boolean;
    deformation: boolean;
    susceptibility: boolean;
  };
  setSelectedZone: (zoneId: string | null) => void;
  setSelectedRegions: (regions: string[]) => void;
  setActiveChartRegion: (region: FocusRegionName | 'all') => void;
  toggleRegion: (region: string) => void;
  resetToDefaultRegions: () => void;
  toggleLayer: (layer: keyof MapState['layers']) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedZone: null,
  selectedRegions: [...DEFAULT_FOCUS_REGIONS],
  activeChartRegion: 'all',
  zoom: 5.5,
  center: [29.5, 84.5],
  layers: {
    rainfall: true,
    soilMoisture: false,
    deformation: false,
    susceptibility: true,
  },
  setSelectedZone: (zoneId) => set({ selectedZone: zoneId }),
  setSelectedRegions: (regions) => set({ selectedRegions: regions }),
  setActiveChartRegion: (region) => set({ activeChartRegion: region }),
  toggleRegion: (region) =>
    set((state) => {
      const exists = state.selectedRegions.includes(region);
      return {
        selectedRegions: exists
          ? state.selectedRegions.filter((r) => r !== region)
          : [...state.selectedRegions, region],
      };
    }),
  resetToDefaultRegions: () =>
    set({
      selectedRegions: [...DEFAULT_FOCUS_REGIONS],
      activeChartRegion: 'all',
      center: [29.5, 84.5],
      zoom: 5.5,
    }),
  toggleLayer: (layer) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: !state.layers[layer],
      },
    })),
}));

interface AlertState {
  alerts: TelemetryAlert[];
  unreadCount: number;
  addAlert: (alert: TelemetryAlert) => void;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string, autoRemoveDelayMs?: number) => void;
  removeAlert: (alertId: string) => void;
  resetAlerts: () => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [...INITIAL_ALERTS],
  unreadCount: INITIAL_ALERTS.length,

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
      unreadCount: state.unreadCount + 1,
    })),

  acknowledgeAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, status: 'acknowledged' as const } : a
      ),
    }));
    toast.success('Alert acknowledged by telemetry operator');
  },

  resolveAlert: (alertId, autoRemoveDelayMs = 800) => {
    const target = get().alerts.find((a) => a.id === alertId);
    if (!target) return;

    // Step 1: Mark as resolving with immediate UI feedback
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId
          ? { ...a, status: 'resolving' as const, resolvedAt: new Date().toISOString() }
          : a
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));

    toast.success(`Hazard resolved: ${target.location}. Removing alert...`, {
      icon: '✅',
      duration: 3000,
    });

    // Step 2: Automatically remove the alert completely from active list after animation
    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((a) => a.id !== alertId),
      }));
    }, autoRemoveDelayMs);
  },

  removeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== alertId),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  resetAlerts: () => {
    set({
      alerts: [...INITIAL_ALERTS],
      unreadCount: INITIAL_ALERTS.length,
    });
    toast.success('Default focus regions telemetry alerts reloaded');
  },
}));

interface UIState {
  sidebarCollapsed: boolean;
  isLoading: boolean;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  isLoading: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setLoading: (loading) => set({ isLoading: loading }),
}));