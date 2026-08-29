export interface LandslideZone {
  id: string;
  name: string;
  district: string;
  state: string;
  regionGroup: 'Western & Central Himalayas' | 'Eastern Himalayas & Northeast';
  riskLevel: 'low' | 'medium' | 'high' | 'severe';
  coordinates: [number, number][][];
  stats: {
    rainfall: number; // mm in 24h
    soilMoisture: number; // %
    deformation: number; // mm displacement
    riskScore: number; // %
  };
  population: number;
  area: string;
  keyThreat: string;
}

export const DEFAULT_FOCUS_REGIONS = [
  'Uttarakhand',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Ladakh',
  'Sikkim',
  'Arunachal Pradesh',
  'Assam',
  'Meghalaya',
  'Nagaland',
  'Manipur',
  'Mizoram',
  'Tripura',
] as const;

export type FocusRegionName = (typeof DEFAULT_FOCUS_REGIONS)[number];

export const REGION_GROUPS = {
  'Western & Central Himalayas': [
    'Uttarakhand',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Ladakh',
  ],
  'Eastern Himalayas & Northeast': [
    'Sikkim',
    'Arunachal Pradesh',
    'Assam',
    'Meghalaya',
    'Nagaland',
    'Manipur',
    'Mizoram',
    'Tripura',
  ],
};

export const FOCUS_REGIONS_DATA: LandslideZone[] = [
  // 1. UTTARAKHAND
  {
    id: 'uk-1',
    name: 'Joshimath Sector',
    district: 'Chamoli',
    state: 'Uttarakhand',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'severe',
    coordinates: [[
      [30.55, 79.52],
      [30.62, 79.60],
      [30.58, 79.68],
      [30.48, 79.62],
      [30.50, 79.50],
      [30.55, 79.52],
    ]],
    stats: { rainfall: 168, soilMoisture: 84, deformation: -16.5, riskScore: 89.2 },
    population: 23000,
    area: '420 km²',
    keyThreat: 'Subsidence & Slope Instability on NH-58',
  },
  {
    id: 'uk-2',
    name: 'Kedarnath Valley Corridor',
    district: 'Rudraprayag',
    state: 'Uttarakhand',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'severe',
    coordinates: [[
      [30.65, 79.00],
      [30.75, 79.10],
      [30.70, 79.18],
      [30.60, 79.12],
      [30.58, 79.02],
      [30.65, 79.00],
    ]],
    stats: { rainfall: 182, soilMoisture: 86, deformation: -18.2, riskScore: 91.5 },
    population: 18500,
    area: '380 km²',
    keyThreat: 'Debris Flow & Flash Flood Slope Failure',
  },
  {
    id: 'uk-3',
    name: 'Dharchula Slopes',
    district: 'Pithoragarh',
    state: 'Uttarakhand',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'high',
    coordinates: [[
      [29.80, 80.48],
      [29.92, 80.60],
      [29.88, 80.68],
      [29.75, 80.55],
      [29.80, 80.48],
    ]],
    stats: { rainfall: 135, soilMoisture: 78, deformation: -11.4, riskScore: 78.4 },
    population: 32000,
    area: '510 km²',
    keyThreat: 'Border Highway Rockfalls',
  },

  // 2. HIMACHAL PRADESH
  {
    id: 'hp-1',
    name: 'Kullu-Manali Valley Corridor',
    district: 'Kullu',
    state: 'Himachal Pradesh',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'severe',
    coordinates: [[
      [32.10, 77.10],
      [32.28, 77.22],
      [32.22, 77.30],
      [32.05, 77.20],
      [32.10, 77.10],
    ]],
    stats: { rainfall: 175, soilMoisture: 83, deformation: -15.1, riskScore: 88.0 },
    population: 68000,
    area: '640 km²',
    keyThreat: 'Beas River Bank Erosion & Slump Failure',
  },
  {
    id: 'hp-2',
    name: 'Shimla Bypass Slope Sector',
    district: 'Shimla',
    state: 'Himachal Pradesh',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'high',
    coordinates: [[
      [31.05, 77.12],
      [31.15, 77.25],
      [31.10, 77.32],
      [30.98, 77.20],
      [31.05, 77.12],
    ]],
    stats: { rainfall: 140, soilMoisture: 77, deformation: -9.8, riskScore: 76.5 },
    population: 170000,
    area: '320 km²',
    keyThreat: 'Urban Ridge Slope Overburden',
  },
  {
    id: 'hp-3',
    name: 'Kinnaur Highway NH-05 Sector',
    district: 'Kinnaur',
    state: 'Himachal Pradesh',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'high',
    coordinates: [[
      [31.45, 78.10],
      [31.60, 78.30],
      [31.52, 78.42],
      [31.38, 78.20],
      [31.45, 78.10],
    ]],
    stats: { rainfall: 128, soilMoisture: 72, deformation: -12.3, riskScore: 79.1 },
    population: 24000,
    area: '780 km²',
    keyThreat: 'Massive Rock Avalanche on NH-05',
  },

  // 3. JAMMU & KASHMIR
  {
    id: 'jk-1',
    name: 'Ramban-Banihal NH-44 Corridor',
    district: 'Ramban',
    state: 'Jammu & Kashmir',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'severe',
    coordinates: [[
      [33.20, 75.18],
      [33.35, 75.30],
      [33.30, 75.40],
      [33.15, 75.28],
      [33.20, 75.18],
    ]],
    stats: { rainfall: 160, soilMoisture: 81, deformation: -14.8, riskScore: 86.7 },
    population: 45000,
    area: '410 km²',
    keyThreat: 'Continuous Shooting Stones & Mudslides',
  },
  {
    id: 'jk-2',
    name: 'Reasi-Chenab Slope Sector',
    district: 'Reasi',
    state: 'Jammu & Kashmir',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'high',
    coordinates: [[
      [33.00, 74.75],
      [33.15, 74.90],
      [33.08, 75.02],
      [32.92, 74.85],
      [33.00, 74.75],
    ]],
    stats: { rainfall: 125, soilMoisture: 74, deformation: -8.5, riskScore: 73.2 },
    population: 58000,
    area: '490 km²',
    keyThreat: 'Railway Line Slope Shear Failure',
  },

  // 4. LADAKH
  {
    id: 'la-1',
    name: 'Zoji La & Drass Slope Pass',
    district: 'Kargil',
    state: 'Ladakh',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'medium',
    coordinates: [[
      [34.25, 75.70],
      [34.40, 75.90],
      [34.32, 76.05],
      [34.18, 75.82],
      [34.25, 75.70],
    ]],
    stats: { rainfall: 65, soilMoisture: 58, deformation: -4.2, riskScore: 54.0 },
    population: 14000,
    area: '920 km²',
    keyThreat: 'Permafrost Thaw & Scree Avalanche',
  },
  {
    id: 'la-2',
    name: 'Khardung La Highway Corridor',
    district: 'Leh',
    state: 'Ladakh',
    regionGroup: 'Western & Central Himalayas',
    riskLevel: 'medium',
    coordinates: [[
      [34.20, 77.50],
      [34.35, 77.65],
      [34.28, 77.78],
      [34.12, 77.60],
      [34.20, 77.50],
    ]],
    stats: { rainfall: 55, soilMoisture: 52, deformation: -3.6, riskScore: 48.5 },
    population: 29000,
    area: '1100 km²',
    keyThreat: 'High-Altitude Glacier Melt Debris Flow',
  },

  // 5. SIKKIM
  {
    id: 'sk-1',
    name: 'Gangtok-Pakyong Urban Slope',
    district: 'Gangtok',
    state: 'Sikkim',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'severe',
    coordinates: [[
      [27.28, 88.55],
      [27.40, 88.68],
      [27.35, 88.75],
      [27.22, 88.62],
      [27.28, 88.55],
    ]],
    stats: { rainfall: 190, soilMoisture: 88, deformation: -17.4, riskScore: 92.1 },
    population: 110000,
    area: '290 km²',
    keyThreat: 'High Rainfall Slope Saturation & Slumping',
  },
  {
    id: 'sk-2',
    name: 'Mangan-Dikchu Highway Sector',
    district: 'Mangan',
    state: 'Sikkim',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'severe',
    coordinates: [[
      [27.48, 88.48],
      [27.62, 88.60],
      [27.55, 88.70],
      [27.42, 88.58],
      [27.48, 88.48],
    ]],
    stats: { rainfall: 185, soilMoisture: 85, deformation: -16.0, riskScore: 89.8 },
    population: 18000,
    area: '620 km²',
    keyThreat: 'Teesta Basin Slope Liquefaction',
  },

  // 6. ARUNACHAL PRADESH
  {
    id: 'ar-1',
    name: 'Tawang-Sela Pass Sector',
    district: 'Tawang',
    state: 'Arunachal Pradesh',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'severe',
    coordinates: [[
      [27.50, 91.80],
      [27.65, 91.98],
      [27.58, 92.10],
      [27.42, 91.90],
      [27.50, 91.80],
    ]],
    stats: { rainfall: 152, soilMoisture: 79, deformation: -10.8, riskScore: 81.3 },
    population: 36000,
    area: '850 km²',
    keyThreat: 'High Elevation Border Road Rockslides',
  },
  {
    id: 'ar-2',
    name: 'Dirang-Bomdila Hill Sector',
    district: 'West Kameng',
    state: 'Arunachal Pradesh',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'high',
    coordinates: [[
      [27.20, 92.15],
      [27.35, 92.35],
      [27.28, 92.48],
      [27.12, 92.25],
      [27.20, 92.15],
    ]],
    stats: { rainfall: 138, soilMoisture: 75, deformation: -9.2, riskScore: 75.9 },
    population: 48000,
    area: '740 km²',
    keyThreat: 'Deep Cutting Slope Collapses',
  },

  // 7. ASSAM
  {
    id: 'as-1',
    name: 'Haflong-Jatinga Ridge',
    district: 'Dima Hasao',
    state: 'Assam',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'severe',
    coordinates: [[
      [25.10, 92.75],
      [25.32, 92.95],
      [25.40, 93.15],
      [25.25, 93.05],
      [25.08, 92.82],
      [25.10, 92.75],
    ]],
    stats: { rainfall: 165, soilMoisture: 82, deformation: -13.5, riskScore: 84.6 },
    population: 214000,
    area: '1800 km²',
    keyThreat: 'Railway & Hill Road Subsidence',
  },
  {
    id: 'as-2',
    name: 'Diphu Hill Slopes',
    district: 'Karbi Anglong',
    state: 'Assam',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'medium',
    coordinates: [[
      [25.95, 93.30],
      [26.15, 93.50],
      [26.22, 93.65],
      [26.05, 93.45],
      [25.95, 93.30],
    ]],
    stats: { rainfall: 110, soilMoisture: 68, deformation: -5.4, riskScore: 61.2 },
    population: 340000,
    area: '2100 km²',
    keyThreat: 'Unconsolidated Soil Slump',
  },

  // 8. MEGHALAYA
  {
    id: 'ml-1',
    name: 'East Khasi Hills Escarpment',
    district: 'East Khasi Hills',
    state: 'Meghalaya',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'severe',
    coordinates: [[
      [25.50, 91.70],
      [25.68, 91.95],
      [25.75, 91.88],
      [25.55, 91.60],
      [25.50, 91.70],
    ]],
    stats: { rainfall: 215, soilMoisture: 91, deformation: -19.8, riskScore: 95.4 },
    population: 385000,
    area: '1700 km²',
    keyThreat: 'Torrential Downpour Landslide & Gully Erosion',
  },
  {
    id: 'ml-2',
    name: 'Tura Ridge Sector',
    district: 'West Garo Hills',
    state: 'Meghalaya',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'high',
    coordinates: [[
      [25.45, 89.95],
      [25.62, 90.25],
      [25.58, 90.35],
      [25.40, 90.05],
      [25.45, 89.95],
    ]],
    stats: { rainfall: 148, soilMoisture: 78, deformation: -10.1, riskScore: 77.8 },
    population: 642000,
    area: '2100 km²',
    keyThreat: 'High Slope Mudslides',
  },

  // 9. NAGALAND
  {
    id: 'nl-1',
    name: 'Kohima Bypass Ridge',
    district: 'Kohima',
    state: 'Nagaland',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'high',
    coordinates: [[
      [25.60, 94.00],
      [25.75, 94.20],
      [25.68, 94.30],
      [25.52, 94.10],
      [25.60, 94.00],
    ]],
    stats: { rainfall: 142, soilMoisture: 76, deformation: -9.6, riskScore: 76.2 },
    population: 115000,
    area: '480 km²',
    keyThreat: 'Highway Sinking & Active Creep',
  },
  {
    id: 'nl-2',
    name: 'Mokokchung Hill Sector',
    district: 'Mokokchung',
    state: 'Nagaland',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'medium',
    coordinates: [[
      [26.25, 94.45],
      [26.40, 94.62],
      [26.32, 94.72],
      [26.18, 94.52],
      [26.25, 94.45],
    ]],
    stats: { rainfall: 105, soilMoisture: 66, deformation: -4.8, riskScore: 58.7 },
    population: 85000,
    area: '560 km²',
    keyThreat: 'Shallow Slope Landslides',
  },

  // 10. MANIPUR
  {
    id: 'mn-1',
    name: 'Tamenglong NH Corridor',
    district: 'Tamenglong',
    state: 'Manipur',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'high',
    coordinates: [[
      [24.85, 93.40],
      [25.02, 93.60],
      [24.95, 93.72],
      [24.78, 93.50],
      [24.85, 93.40],
    ]],
    stats: { rainfall: 150, soilMoisture: 80, deformation: -11.2, riskScore: 80.5 },
    population: 52000,
    area: '820 km²',
    keyThreat: 'Heavy Monsoon Slope Shear',
  },
  {
    id: 'mn-2',
    name: 'Senapati Hill Highway Corridor',
    district: 'Senapati',
    state: 'Manipur',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'high',
    coordinates: [[
      [25.18, 93.90],
      [25.35, 94.10],
      [25.28, 94.22],
      [25.10, 94.00],
      [25.18, 93.90],
    ]],
    stats: { rainfall: 132, soilMoisture: 73, deformation: -8.9, riskScore: 72.8 },
    population: 64000,
    area: '670 km²',
    keyThreat: 'Highway Cutting Instability',
  },

  // 11. MIZORAM
  {
    id: 'mz-1',
    name: 'Aizawl City Ridge Slopes',
    district: 'Aizawl',
    state: 'Mizoram',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'high',
    coordinates: [[
      [23.65, 92.65],
      [23.80, 92.80],
      [23.72, 92.90],
      [23.58, 92.72],
      [23.65, 92.65],
    ]],
    stats: { rainfall: 155, soilMoisture: 81, deformation: -12.1, riskScore: 82.0 },
    population: 320000,
    area: '410 km²',
    keyThreat: 'Steep Slope Settlement & Slump',
  },
  {
    id: 'mz-2',
    name: 'Lunglei South Ridge',
    district: 'Lunglei',
    state: 'Mizoram',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'medium',
    coordinates: [[
      [22.82, 92.68],
      [22.98, 92.85],
      [22.90, 92.95],
      [22.75, 92.78],
      [22.82, 92.68],
    ]],
    stats: { rainfall: 112, soilMoisture: 67, deformation: -5.1, riskScore: 60.4 },
    population: 78000,
    area: '590 km²',
    keyThreat: 'Bedding Plane Landslide',
  },

  // 12. TRIPURA
  {
    id: 'tr-1',
    name: 'Unakoti Hill Sector',
    district: 'Unakoti',
    state: 'Tripura',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'medium',
    coordinates: [[
      [24.28, 91.95],
      [24.42, 92.12],
      [24.35, 92.22],
      [24.20, 92.05],
      [24.28, 91.95],
    ]],
    stats: { rainfall: 98, soilMoisture: 64, deformation: -3.8, riskScore: 52.1 },
    population: 62000,
    area: '340 km²',
    keyThreat: 'Soil Slip & Erosion',
  },
  {
    id: 'tr-2',
    name: 'Atharamura Ridge Sector',
    district: 'Dhalai',
    state: 'Tripura',
    regionGroup: 'Eastern Himalayas & Northeast',
    riskLevel: 'low',
    coordinates: [[
      [23.82, 91.80],
      [23.95, 91.96],
      [23.88, 92.08],
      [23.75, 91.90],
      [23.82, 91.80],
    ]],
    stats: { rainfall: 68, soilMoisture: 55, deformation: -2.1, riskScore: 38.5 },
    population: 48000,
    area: '450 km²',
    keyThreat: 'Minor Slope Washout',
  },
];

export const MAJOR_FOCUS_CITIES = [
  { name: 'Dehradun', state: 'Uttarakhand', pos: [30.3165, 78.0322] as [number, number] },
  { name: 'Shimla', state: 'Himachal Pradesh', pos: [31.1048, 77.1734] as [number, number] },
  { name: 'Srinagar', state: 'Jammu & Kashmir', pos: [34.0837, 74.7973] as [number, number] },
  { name: 'Leh', state: 'Ladakh', pos: [34.1526, 77.5771] as [number, number] },
  { name: 'Gangtok', state: 'Sikkim', pos: [27.3389, 88.6065] as [number, number] },
  { name: 'Itanagar', state: 'Arunachal Pradesh', pos: [27.0844, 93.6063] as [number, number] },
  { name: 'Guwahati / Dispur', state: 'Assam', pos: [26.1445, 91.7362] as [number, number] },
  { name: 'Shillong', state: 'Meghalaya', pos: [25.5788, 91.8933] as [number, number] },
  { name: 'Kohima', state: 'Nagaland', pos: [25.6751, 94.1086] as [number, number] },
  { name: 'Imphal', state: 'Manipur', pos: [24.8170, 93.9368] as [number, number] },
  { name: 'Aizawl', state: 'Mizoram', pos: [23.7271, 92.7176] as [number, number] },
  { name: 'Agartala', state: 'Tripura', pos: [23.8315, 91.2868] as [number, number] },
];

export interface RegionRainfallProfile {
  state: FocusRegionName;
  threshold: number; // in mm / 24h
  terrain: string;
  geologySummary: string;
  weeklyRainfall: number[]; // 7 days (Mon to Sun)
}

export const REGION_RAINFALL_PROFILES: Record<FocusRegionName, RegionRainfallProfile> = {
  'Uttarakhand': {
    state: 'Uttarakhand',
    threshold: 80,
    terrain: 'Fractured High-Grade Metamorphic & Gneiss',
    geologySummary: 'Main Central Thrust (MCT) zone with highly fragmented limestone & shear planes',
    weeklyRainfall: [45, 62, 78, 95, 112, 135, 168],
  },
  'Himachal Pradesh': {
    state: 'Himachal Pradesh',
    threshold: 90,
    terrain: 'Steep River Valley Gorges & Glacial Drift',
    geologySummary: 'Overburden slopes in Beas & Sutlej basins susceptible to river toe-erosion',
    weeklyRainfall: [40, 58, 72, 88, 110, 140, 175],
  },
  'Jammu & Kashmir': {
    state: 'Jammu & Kashmir',
    threshold: 85,
    terrain: 'Thrust Fault Zones & Unconsolidated Scree',
    geologySummary: 'Siwalik and Murree formations along NH-44 Ramban corridor with rapid pore pressure rise',
    weeklyRainfall: [38, 52, 68, 82, 105, 130, 160],
  },
  'Ladakh': {
    state: 'Ladakh',
    threshold: 40,
    terrain: 'Cold Arid Permafrost & Scree Slopes',
    geologySummary: 'Glacial scree and moraines triggered easily by localized cloudbursts and permafrost thaw',
    weeklyRainfall: [10, 15, 22, 28, 35, 48, 65],
  },
  'Sikkim': {
    state: 'Sikkim',
    threshold: 120,
    terrain: 'Steep Gneiss/Schist Slopes & Teesta Basin',
    geologySummary: 'Darjeeling gneiss and Daling group phyllites prone to debris flows during intense monsoons',
    weeklyRainfall: [35, 60, 85, 110, 135, 160, 190],
  },
  'Arunachal Pradesh': {
    state: 'Arunachal Pradesh',
    threshold: 110,
    terrain: 'Rugged Metamorphic Fold Belts',
    geologySummary: 'High-energy tectonic mountain belts with frequent rockfall along strategic border highways',
    weeklyRainfall: [30, 50, 75, 95, 120, 140, 152],
  },
  'Assam': {
    state: 'Assam',
    threshold: 95,
    terrain: 'Sedimentary Clay-Rich Hill Tracts',
    geologySummary: 'Disang-Barail sedimentary formations in Dima Hasao subject to severe railway track slumping',
    weeklyRainfall: [35, 55, 70, 90, 115, 140, 165],
  },
  'Meghalaya': {
    state: 'Meghalaya',
    threshold: 180,
    terrain: 'Karstified Sandstone Plateau Escarpments',
    geologySummary: 'World-highest rainfall belt with deep gully erosion along southern Meghalaya fault scarps',
    weeklyRainfall: [65, 95, 130, 165, 195, 220, 265],
  },
  'Nagaland': {
    state: 'Nagaland',
    threshold: 100,
    terrain: 'Disang Shale & Active Thrust Ridges',
    geologySummary: 'Unconsolidated fissile shales in Kohima and Mokokchung prone to continuous creep',
    weeklyRainfall: [30, 48, 65, 85, 108, 125, 142],
  },
  'Manipur': {
    state: 'Manipur',
    threshold: 105,
    terrain: 'Tertiary Flysch Formations & Clay Ridges',
    geologySummary: 'High plasticity clayey soil along NH-37 Tamenglong & Senapati highway slopes',
    weeklyRainfall: [32, 50, 68, 88, 112, 130, 150],
  },
  'Mizoram': {
    state: 'Mizoram',
    threshold: 115,
    terrain: 'Steep Anticlinal Sandstone-Shale Ridges',
    geologySummary: 'Bedding-plane slip and urban overburden on steep longitudinal ridges of Aizawl',
    weeklyRainfall: [35, 54, 72, 92, 118, 138, 155],
  },
  'Tripura': {
    state: 'Tripura',
    threshold: 75,
    terrain: 'Low Clay-Sand Anticlines & Soft Hillocks',
    geologySummary: 'Tipam sandstone and Dupitila clay beds vulnerable to rapid washouts and road sinking',
    weeklyRainfall: [25, 38, 50, 62, 74, 86, 98],
  },
};

/**
 * Returns the rainfall and threshold profile for a single region or aggregated across selected regions
 */
export const getRegionRainfallData = (
  selectedRegion: FocusRegionName | 'all',
  activeRegionsList: string[] = [...DEFAULT_FOCUS_REGIONS]
) => {
  if (selectedRegion !== 'all' && REGION_RAINFALL_PROFILES[selectedRegion]) {
    return REGION_RAINFALL_PROFILES[selectedRegion];
  }

  // Calculate aggregated average for currently active regions
  const validRegions = activeRegionsList.filter(
    (r): r is FocusRegionName => r in REGION_RAINFALL_PROFILES
  );

  const list = validRegions.length > 0 ? validRegions : (DEFAULT_FOCUS_REGIONS as unknown as FocusRegionName[]);
  const avgThreshold = Math.round(
    list.reduce((sum, r) => sum + REGION_RAINFALL_PROFILES[r].threshold, 0) / list.length
  );

  const avgWeekly = [0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
    const sum = list.reduce((acc, r) => acc + REGION_RAINFALL_PROFILES[r].weeklyRainfall[dayIdx], 0);
    return Math.round(sum / list.length);
  });

  return {
    state: 'All Focus Regions' as any,
    threshold: avgThreshold,
    terrain: 'Himalayan & Northeast Landslide Belt',
    geologySummary: `Aggregated telemetry across ${list.length} active landslide-prone focus regions`,
    weeklyRainfall: avgWeekly,
  };
};

