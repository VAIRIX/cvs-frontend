import { FC } from 'react';
import { Box, Typography } from '@mui/material';

type LegendProps = {
  total: number;
  title: string;
  color?: string;
};

const Legend: FC<LegendProps> = ({ total, title, color }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {color && (
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: color,
          }}
        />
      )}
      <Typography
        sx={{
          color: !color ? 'black' : 'rgb(185, 185, 185)',
          fontSize: 16,
          fontWeight: !color ? 600 : 400,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {total}
      </Typography>
    </Box>
  );
};

export default Legend;
