import { FC, PropsWithChildren } from 'react';
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type DialogProps = {
  isOpen: boolean;
  dialogTitle: string;
  close: () => void;
  submit: () => void;
  closeText: string;
  submitText: string;
};

const Dialog: FC<PropsWithChildren<DialogProps>> = ({
  isOpen,
  dialogTitle,
  close,
  submit,
  children,
  closeText,
  submitText,
}) => {
  return (
    <MuiDialog open={isOpen} onClose={close}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          {closeText}
        </Button>
        <Button onClick={submit} color="primary">
          {submitText}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
