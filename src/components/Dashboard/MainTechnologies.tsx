import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const MainTechnologies: FC = () => {
  const theme = useTheme();
  // TODO: get data from analytics endpoint
  const data = [
    {
      name: 'React',
      value: 200,
    },
    {
      name: 'Ruby',
      value: 100,
    },
    {
      name: 'Node',
      value: 100,
    },
    {
      name: 'Go',
      value: 100,
    },
    {
      name: 'AWS',
      value: 300,
    },
  ];

  return (
    <ResponsiveContainer height={'100%'}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />
        <YAxis type="category" yAxisId={0} dataKey="name" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill={theme.palette.secondary.light} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MainTechnologies;
