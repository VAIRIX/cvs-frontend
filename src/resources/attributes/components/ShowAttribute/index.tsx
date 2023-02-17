import React from 'react';
import { Chip } from 'components/ui';
import { Box } from '@mui/material';
import { AttributeResponse } from 'types';

export const ShowAttributes = ({
  allAttributes,
  handleEdit,
  attributeType,
}: any) => {
  return (
    <>
      {allAttributes?.map((attribute: AttributeResponse) => {
        if (attribute.type.id === attributeType.id) {
          return (
            <Box onClick={handleEdit.bind(null, attribute)}>
              <Chip
                key={attribute.id}
                label={attribute.name}
                value={attribute.level}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          );
        }
      })}
    </>
  );
};
