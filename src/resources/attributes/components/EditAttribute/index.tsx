import { TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Dialog from 'components/Dialog';
import { TEXTS } from 'constants/texts';
import { AttributeResponse } from 'types';
import { useEditAttribute } from 'hooks/useEditAttribute';

type EditAttributeProps = {
  attributeToEdit: AttributeResponse | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const EditAttribute = ({
  attributeToEdit,
  isOpen,
  setIsOpen,
}: EditAttributeProps) => {
  const { editAttribute } = useEditAttribute();
  const [editedName, setEditedName] = useState<string | undefined>('');

  useEffect(() => {
    setEditedName(attributeToEdit?.name);
  }, [attributeToEdit]);

  const handleSubmit = useCallback(() => {
    if (!attributeToEdit) return;
    if (!editedName) return;
    setIsOpen(false);
    editAttribute({
      name: editedName,
      typeId: attributeToEdit.type.id,
      id: attributeToEdit.id,
    });
  }, [editedName, attributeToEdit]);

  const handleNameChange = useCallback((e: any) => {
    setEditedName(e.target.value);
  }, []);

  return (
    <Dialog
      closeText={TEXTS.CANCEL}
      submitText={TEXTS.EDIT}
      dialogTitle={TEXTS.EDIT_ATTRIBUTE}
      close={setIsOpen.bind(null, false)}
      isOpen={isOpen}
      submit={handleSubmit}
    >
      <TextField
        label={TEXTS.ATTRIBUTE_PLACEHOLDER}
        onChange={handleNameChange}
        sx={{ flex: 1, mr: 1 }}
        value={editedName}
      />
    </Dialog>
  );
};
