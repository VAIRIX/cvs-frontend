import { FC } from 'react';
import { Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Legend from './Legend';
import { TEXTS } from 'constants/index';

const TotalProfessionals: FC = () => {
  // TODO: get data from analytics endpoint
  const totalAllocated = 180;
  const totalUnallocated = 20;
  const total = totalAllocated + totalUnallocated;
  const PieChartData = [
    { name: 'Allocated', value: totalAllocated, color: 'red' },
    { name: 'Unallocated', value: totalUnallocated, color: 'green' },
  ];

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <ResponsiveContainer height={'100%'}>
          <PieChart>
            <Pie
              tooltipType="none"
              data={PieChartData}
              innerRadius={30}
              outerRadius={50}
              dataKey="value"
            >
              {PieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            pl: 1,
          }}
        >
          <Legend title="Total" total={total} />
          <Legend
            color="green"
            title={TEXTS.UNALLOCATED}
            total={totalUnallocated}
          />
          <Legend color="red" title={TEXTS.ALLOCATED} total={totalAllocated} />
        </Box>
      </Box>
    </>
  );
};

export default TotalProfessionals;
