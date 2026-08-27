export const mockZones = [
  {
    id: '1',
    name: 'East Khasi Hills',
    riskLevel: 'severe',
    coordinates: [[[25.5, 91.8], [25.6, 91.9], [25.7, 91.8], [25.6, 91.7], [25.5, 91.8]]],
    stats: { rainfall: 178, soilMoisture: 82, deformation: -14.2, riskScore: 87.4 }
  },
  {
    id: '2',
    name: 'West Garo Hills',
    riskLevel: 'high',
    coordinates: [[[25.5, 90.2], [25.6, 90.3], [25.7, 90.2], [25.6, 90.1], [25.5, 90.2]]],
    stats: { rainfall: 145, soilMoisture: 76, deformation: -8.7, riskScore: 72.1 }
  },
  {
    id: '3',
    name: 'Dima Hasao',
    riskLevel: 'high',
    coordinates: [[[25.2, 93.2], [25.3, 93.3], [25.4, 93.2], [25.3, 93.1], [25.2, 93.2]]],
    stats: { rainfall: 156, soilMoisture: 74, deformation: -9.3, riskScore: 74.8 }
  }
];

export const mockAlerts = [
  {
    id: '1',
    title: 'Landslide Imminent',
    location: 'Sonapur Ridge',
    severity: 'critical',
    description: 'Rainfall 100mm/24h exceeds threshold 80mm',
    timestamp: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '2',
    title: 'High Risk Detected',
    location: 'Khali Slope-4',
    severity: 'warning',
    description: 'Rainfall 100mm/24h exceeds threshold 80mm',
    timestamp: new Date().toISOString(),
    status: 'active'
  }
];

export const mockRainfallData = [
  { day: 'Mon', rainfall: 45, threshold: 80 },
  { day: 'Tue', rainfall: 62, threshold: 80 },
  { day: 'Wed', rainfall: 78, threshold: 80 },
  { day: 'Thu', rainfall: 95, threshold: 80 },
  { day: 'Fri', rainfall: 112, threshold: 80 },
  { day: 'Sat', rainfall: 135, threshold: 80 },
  { day: 'Sun', rainfall: 158, threshold: 80 },
];