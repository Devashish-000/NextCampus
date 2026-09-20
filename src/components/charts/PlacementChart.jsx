import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const PlacementChart = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 15, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="highestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="avgSalaryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
          <XAxis dataKey="year" stroke="#64748B" fontSize={12} tickLine={false} />
          
          {/* Dual Y-Axes to display both curves with crisp scale */}
          <YAxis yAxisId="left" stroke="#10B981" fontSize={12} unit=" L" tickLine={false} domain={[50, 420]} />
          <YAxis yAxisId="right" orientation="right" stroke="#6366F1" fontSize={12} unit=" L" tickLine={false} domain={[10, 30]} />

          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              color: '#fff',
              fontSize: '13px',
              padding: '12px 16px',
            }}
            formatter={(val, name) => [`₹${val} LPA`, name]}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="highestSalary"
            name="Highest Package (LPA - Left Scale)"
            stroke="#10B981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#highestGrad)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="avgSalary"
            name="Average Package (LPA - Right Scale)"
            stroke="#6366F1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#avgSalaryGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
