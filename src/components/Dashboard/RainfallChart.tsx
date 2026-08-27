import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const RainfallChart = () => {
  const data = [
    { day: 'Mon', rainfall: 45, threshold: 80 },
    { day: 'Tue', rainfall: 62, threshold: 80 },
    { day: 'Wed', rainfall: 78, threshold: 80 },
    { day: 'Thu', rainfall: 95, threshold: 80 },
    { day: 'Fri', rainfall: 112, threshold: 80 },
    { day: 'Sat', rainfall: 135, threshold: 80 },
    { day: 'Sun', rainfall: 158, threshold: 80 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip 
          contentStyle={{ 
            background: '#ffffff', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#111827'
          }}
        />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="rainfall" 
          stroke="#3b82f6" 
          fill="url(#rainfallGradient)"
          name="Rainfall (mm)"
        />
        <Line 
          type="monotone" 
          dataKey="threshold" 
          stroke="#ef4444" 
          strokeDasharray="5 5"
          strokeWidth={2}
          name="Threshold (80mm)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RainfallChart;