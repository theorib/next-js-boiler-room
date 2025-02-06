'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const chartConfig = {
  uv: {
    label: 'uv',
    color: '#2563eb',
  },
  pv: {
    label: 'pv',
    color: '#27476e',
  },
  amt: {
    label: 'amt',
    color: '#187b5f',
  },
} satisfies ChartConfig;

export default function AreaChartComponent() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <AreaChart data={data}>
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="var(--color-uv)"
          fill="var(--color-uv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="var(--color-pv)"
          fill="var(--color-pv)"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="var(--color-amt)"
          fill="var(--color-amt)"
        />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
