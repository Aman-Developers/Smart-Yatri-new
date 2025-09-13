import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TouristFlowChart = ({ data, onDataPointClick }) => {
  const chartData = [
    {
      date: '01 Dec',
      domestic: 1250,
      foreign: 320,
      compliant: 1420,
      nonCompliant: 150,
      total: 1570
    },
    {
      date: '02 Dec',
      domestic: 1180,
      foreign: 280,
      compliant: 1310,
      nonCompliant: 150,
      total: 1460
    },
    {
      date: '03 Dec',
      domestic: 1420,
      foreign: 380,
      compliant: 1650,
      nonCompliant: 150,
      total: 1800
    },
    {
      date: '04 Dec',
      domestic: 1680,
      foreign: 420,
      compliant: 1890,
      nonCompliant: 210,
      total: 2100
    },
    {
      date: '05 Dec',
      domestic: 1520,
      foreign: 360,
      compliant: 1720,
      nonCompliant: 160,
      total: 1880
    },
    {
      date: '06 Dec',
      domestic: 1380,
      foreign: 340,
      compliant: 1580,
      nonCompliant: 140,
      total: 1720
    },
    {
      date: '07 Dec',
      domestic: 1450,
      foreign: 390,
      compliant: 1690,
      nonCompliant: 150,
      total: 1840
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-panel rounded-lg p-4 border border-border">
          <p className="text-foreground font-medium mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="text-foreground font-medium">{entry?.value?.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Daily Tourist Arrivals & Permit Status
          </h3>
          <p className="text-sm text-muted-foreground">
            Breakdown by nationality and compliance status
          </p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-muted-foreground">Domestic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-muted-foreground">Foreign</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-muted-foreground">Compliance Rate</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={onDataPointClick}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Bar 
              dataKey="domestic" 
              name="Domestic Tourists"
              fill="var(--color-accent)" 
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
            <Bar 
              dataKey="foreign" 
              name="Foreign Tourists"
              fill="var(--color-success)" 
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
            <Line 
              type="monotone" 
              dataKey="compliant" 
              name="Compliant Permits"
              stroke="var(--color-warning)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TouristFlowChart;