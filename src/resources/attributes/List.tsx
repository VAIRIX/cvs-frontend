import { RESOURCES } from 'api/resources';
import { useGetList } from 'react-admin';
import { Box, Stack, Typography } from '@mui/material';
import { CreateAttribute } from './components/CreateAttribute';
import { useCallback, useState } from 'react';
import { AttributeResponse } from 'types';
import { EditAttribute } from './components/EditAttribute';
import { ShowAttributes } from './components/ShowAttribute';

export const AttributesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [attributeToEdit, setAttributeToEdit] =
    useState<AttributeResponse | null>(null);

  const { data: allAttributes } = useGetList<any>(RESOURCES.ATTRIBUTES);
  const { data: attributeTypes } = useGetList<any>(RESOURCES.ATTRIBUTE_TYPES);

  const handleEdit = useCallback((attribute: any) => {
    setAttributeToEdit(attribute);
    setIsOpen(true);
  }, []);

  return (
    <Stack gap="40px" marginTop="20px">
      {attributeTypes?.map((attributeType) => (
        <Box>
          <Typography variant="h4">{attributeType.name}</Typography>
          <Stack flexDirection="row" marginTop="20px">
            <ShowAttributes
              allAttributes={allAttributes}
              handleEdit={handleEdit}
              attributeType={attributeType}
            />
            <CreateAttribute attributeTypeId={attributeType.id} />
            <EditAttribute
              attributeToEdit={attributeToEdit}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
