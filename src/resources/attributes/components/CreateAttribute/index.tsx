import { useCreateAttribute } from 'hooks';
import { Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import Dialog from 'components/Dialog';
import { TEXTS } from 'constants/texts';

export const CreateAttribute = ({
  attributeTypeId,
}: {
  attributeTypeId: string;
}) => {
  const { createAttribute } = useCreateAttribute();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>('');

  const handleAddAttribute = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    createAttribute({ name: name, typeId: attributeTypeId });
    setIsOpen(false);
  }, [name]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [],
  );

  return (
    <>
      <Button color="primary" variant="outlined" onClick={handleAddAttribute}>
        {TEXTS.ADD}
      </Button>
      <Dialog
        closeText={TEXTS.CANCEL}
        submitText={TEXTS.ADD}
        dialogTitle={TEXTS.ADD_ATTRIBUTE}
        close={handleClose}
        isOpen={isOpen}
        submit={handleSubmit}
      >
        <TextField
          label={TEXTS.ATTRIBUTE_PLACEHOLDER}
          onChange={handleNameChange}
          sx={{ flex: 1, mr: 1 }}
        />
      </Dialog>
    </>
  );
};
