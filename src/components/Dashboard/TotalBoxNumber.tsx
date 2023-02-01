import { Box } from '@mui/material';

const TotalBoxNumber = ({ value }: { value: number }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: 80,
    }}
  >
    {value}
  </Box>
);

export default TotalBoxNumber;
