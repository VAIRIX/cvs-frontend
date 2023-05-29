import { Box, CircularProgress, Link, LinearProgress } from '@mui/material';
import { FC, useState } from 'react';
import { SubsectionTitle } from 'components/ui';
import { TEXTS } from 'constants/index';

type GoogleDocResumeProps = {
  loading: boolean;
  url: string | undefined;
};

const GoogleDocResume: FC<GoogleDocResumeProps> = ({ loading, url }) => {
  const [loadingPreview, setLoadingPreview] = useState(true);

  return (
    <Box sx={{ mt: 2, height: '100%' }}>
      <SubsectionTitle title={TEXTS.GOOGLE_DOC_LINK} />
      <Link href={url} underline="hover" target={'_blank'}>
        {url}
      </Link>
      <Box
        sx={{
          mt: 2,
          width: '100%',
          flexFlow: 'column',
          display: 'flex',
          height: '100%',
        }}
      >
        {loading ? <CircularProgress /> : <></>}

        {loadingPreview && url ? <LinearProgress /> : <></>}
        <iframe
          onLoad={() => {
            setLoadingPreview(false);
          }}
          src={url}
          style={{
            border: 'none',
            height: '100%',
            maxHeight: 800,
            minHeight: 600,
          }}
          width="100%"
        />
      </Box>
    </Box>
  );
};

export default GoogleDocResume;
