import { useMemo } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
  ReferenceLine,
} from 'recharts';
import { useTranslation } from '../../i18n';
import { useMapStore } from '../../store';
import { getRegionRainfallData } from '../../data/focusRegionsData';

interface RainfallChartProps {
  regionOverride?: string;
}

const RainfallChart = ({ regionOverride }: RainfallChartProps) => {
  const { t, tRegion } = useTranslation();
  const { selectedRegions, activeChartRegion } = useMapStore();

  const targetRegion = (regionOverride ?? activeChartRegion) as any;

  const profile = useMemo(() => {
    return getRegionRainfallData(targetRegion, selectedRegions);
  }, [targetRegion, selectedRegions]);

  const daysKeys = [
    t('chart.days.mon'),
    t('chart.days.tue'),
    t('chart.days.wed'),
    t('chart.days.thu'),
    t('chart.days.fri'),
    t('chart.days.sat'),
    t('chart.days.sun'),
  ];

  const data = useMemo(() => {
    return daysKeys.map((dayName, idx) => ({
      day: dayName,
      rainfall: profile.weeklyRainfall[idx] || 0,
      threshold: profile.threshold,
      isExceeded: (profile.weeklyRainfall[idx] || 0) >= profile.threshold,
    }));
  }, [profile, daysKeys]);

  const regionDisplayName =
    targetRegion === 'all'
      ? t('dashboard.focusRegionsLabel')
      : tRegion(targetRegion);

  return (
    <div className="w-full h-full flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 5, left: -10 }}>
          <defs>
            <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
          <YAxis
            stroke="#64748b"
            tick={{ fontSize: 11 }}
            domain={[0, (dataMax: number) => Math.max(dataMax + 20, profile.threshold + 30)]}
          />
          <Tooltip
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              fontSize: '12px',
            }}
            formatter={(value: any, name: string) => {
              if (name.includes('Threshold') || name.includes('सीमा') || name.includes('বিপদসীমা')) {
                return [`${value} mm / 24h`, `${regionDisplayName} Threshold`];
              }
              return [`${value} mm`, t('chart.rainfallLabel')];
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          <Area
            type="monotone"
            dataKey="rainfall"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#rainfallGradient)"
            name={`${t('chart.rainfallLabel')} (${regionDisplayName})`}
          />
          <Line
            type="monotone"
            dataKey="threshold"
            stroke="#dc2626"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
            name={`${t('chart.thresholdLabel')} (${profile.threshold}mm/24h)`}
          />
          <ReferenceLine
            y={profile.threshold}
            stroke="#dc2626"
            strokeDasharray="3 3"
            label={{
              value: `Threshold: ${profile.threshold}mm`,
              fill: '#b91c1c',
              fontSize: 10,
              position: 'top',
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainfallChart;