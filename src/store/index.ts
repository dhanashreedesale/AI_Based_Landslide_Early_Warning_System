import { create } from 'zustand';

interface MapState {
  selectedZone: string | null;
  zoom: number;
  center: [number, number];
  layers: {
    rainfall: boolean;
    soilMoisture: boolean;
    deformation: boolean;
    susceptibility: boolean;
  };
  setSelectedZone: (zoneId: string | null) => void;
  toggleLayer: (layer: keyof MapState['layers']) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedZone: null,
  zoom: 7,
  center: [25.8, 92.5],
  layers: {
    rainfall: true,
    soilMoisture: false,
    deformation: false,
    susceptibility: true,
  },
  setSelectedZone: (zoneId) => set({ selectedZone: zoneId }),
  toggleLayer: (layer) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: !state.layers[layer],
      },
    })),
}));

interface AlertState {
  alerts: any[];
  unreadCount: number;
  addAlert: (alert: any) => void;
  markAsRead: (alertId: string) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  unreadCount: 0,
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (alertId) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== alertId),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
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