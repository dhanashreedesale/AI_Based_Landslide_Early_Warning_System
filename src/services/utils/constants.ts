export const RISK_COLORS = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  severe: '#dc2626',
} as const;

export const RISK_LABELS = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  severe: 'Severe Risk',
} as const;

export const API_ENDPOINTS = {
  BASE: '/api',
  ALERTS: '/alerts',
  ZONES: '/zones',
  RAINFALL: '/rainfall',
  DEFORMATION: '/deformation',
  SOIL_MOISTURE: '/soil-moisture',
  DATA_SOURCES: '/data-sources',
  REPORTS: '/reports',
} as const;