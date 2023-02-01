import { Box, Grid } from '@mui/material';
import { SectionTitle } from 'components/ui';
import { FC, PropsWithChildren } from 'react';

type GridItemProps = {
  title: string;
};

const GridItem: FC<PropsWithChildren<GridItemProps>> = ({
  children,
  title,
}) => {
  return (
    <Grid item lg={3} md={6} sm={12}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: 300,
          backgroundColor: '#fff',
          boxShadow:
            '0px 12px 33px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a, 0 1px 8px 0 #9a9a9a1a',
          p: 4,
        }}
      >
        <SectionTitle
          sx={{
            flex: 1,
            color: 'rgb(110, 110, 110)',
          }}
          title={title}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 4,
            position: 'relative',
          }}
        >
          {children}
        </Box>
      </Box>
    </Grid>
  );
};

export default GridItem;
