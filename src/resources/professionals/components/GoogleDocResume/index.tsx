import { Box, CircularProgress, Link } from '@mui/material';
import { FC } from 'react';
import { SubsectionTitle } from 'components/ui';

type GoogleDocResumeProps = {
  loading: boolean;
  url: string | undefined;
};

const GoogleDocResume: FC<GoogleDocResumeProps> = ({ loading, url }) => {
  return (
    <Box sx={{ mt: '24px', height: '100%' }}>
      <SubsectionTitle title={'GOOGLE DOC LINK'} />
      <Link href={url} underline="hover" target={'_blank'}>
        {url}
      </Link>
      <Box
        sx={{
          mt: '37px',
          width: '100%',
          justifyContent: 'center',
          display: 'flex',
          height: '100%',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <iframe
            src={url}
            style={{
              border: 'none',
              height: '100%',
              maxHeight: '800px',
              minHeight: '600px',
            }}
            width="100%"
          />
        )}
      </Box>
    </Box>
  );
};

export default GoogleDocResume;
