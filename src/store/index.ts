import { create } from 'zustand';
import { DEFAULT_FOCUS_REGIONS } from '../data/focusRegionsData';

interface MapState {
  selectedZone: string | null;
  selectedRegions: string[];
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
  toggleRegion: (region: string) => void;
  resetToDefaultRegions: () => void;
  toggleLayer: (layer: keyof MapState['layers']) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedZone: null,
  selectedRegions: [...DEFAULT_FOCUS_REGIONS],
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