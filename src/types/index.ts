export interface Zone {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high' | 'severe';
  coordinates: [number, number][][];
  stats: {
    rainfall: number;
    soilMoisture: number;
    deformation: number;
    riskScore: number;
  };
}

export interface Alert {
  id: string;
  title: string;
  location: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface DataSource {
  id: string;
  name: string;
  type: 'satellite' | 'weather' | 'terrain' | 'seismic';
  status: 'live' | 'mock' | 'offline';
  lastUpdate: string;
  description: string;
  icon: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly';
  date: string;
  format: 'pdf' | 'csv' | 'json';
  size: string;
  status: 'generated' | 'pending';
  description: string;
}