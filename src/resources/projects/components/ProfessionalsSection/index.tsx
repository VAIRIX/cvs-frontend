import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { ProfessionalResponse, ProjectProfessionalResponse } from 'types';
import Professional from './Professional';
import {
  Box,
  Button,
  DialogContentText,
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material';
import { SectionTitle } from 'components/ui';
import { useRedirect, required, TextInput } from 'react-admin';
import Dialog from 'components/Dialog';
import { addSource } from 'utils';

type ProfessionalsSectionProps = {
  professionals: ProjectProfessionalResponse[] | undefined;
  allProfessionals?: ProfessionalResponse[] | undefined;
  setProjectProfessionals?: Dispatch<
    SetStateAction<ProjectProfessionalResponse[]>
  >;
  isEdit: boolean;
  projectId?: string;
};

export const ProfessionalsSection: FC<ProfessionalsSectionProps> = ({
  professionals,
  isEdit = false,
  projectId,
  allProfessionals,
  setProjectProfessionals,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const redirect = useRedirect();
  const [selectedProfessional, setSelectedProfessional] =
    useState<ProfessionalResponse | null>(null);
  const [professionalRole, setProfessionalRole] = useState('');
  const availableProfessionals = useMemo(
    () =>
      allProfessionals?.filter(
        (professional) =>
          !professionals?.find((p) => p.professional.id === professional.id),
      ),
    [allProfessionals, professionals],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (!setProjectProfessionals) return;
    if (!selectedProfessional) return;
    if (!professionalRole) return;
    const newProfessionalProject: ProjectProfessionalResponse = {
      responsibility: professionalRole,
      professional: selectedProfessional,
    };
    setProjectProfessionals((prev) => [...prev, newProfessionalProject]);
    setIsOpen(false);
    setSelectedProfessional(null);
  }, [selectedProfessional, setProjectProfessionals, professionalRole]);

  const handleAddProfessional = useCallback(() => {
    if (isEdit) {
      setIsOpen(true);
    } else {
      redirect('edit', 'projects', projectId);
    }
  }, [projectId]);

  const handleGetOptionLabel = useCallback(
    (option: ProfessionalResponse): string => {
      return `${option.firstName} ${option.lastName}`;
    },
    [],
  );

  const handleOnChangeAutocomplete = useCallback(
    (_: unknown, newValue: ProfessionalResponse | null) => {
      setSelectedProfessional(newValue);
    },
    [],
  );

  type NewType = AutocompleteRenderInputParams;

  const handleRenderInputAutocomplete = useCallback(
    (params: NewType) => (
      <TextField {...params} label="Search project" fullWidth />
    ),
    [],
  );

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfessionalRole(e.target.value);
    },
    [],
  );

  const deleteProfessional = (id: string) => {
    if (!setProjectProfessionals) return;
    setProjectProfessionals((prev) =>
      prev.filter((professional) => professional.professional.id !== id),
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <SectionTitle title="Professionals:" sx={{ mb: '24px' }} />

        {isEdit && (
          <Box>
            <Button variant="outlined" onClick={handleAddProfessional}>
              Add Professional
            </Button>
          </Box>
        )}
      </Box>
      {professionals?.map((professional: ProjectProfessionalResponse) => (
        <Professional
          key={professional?.professional.id}
          professional={professional?.professional}
          responsibility={professional?.responsibility}
          deleteProfessional={deleteProfessional}
          isEdit={isEdit}
        />
      ))}
      {availableProfessionals && (
        <Dialog
          closeText="Cancel"
          submitText="Add"
          dialogTitle="Add professional"
          close={handleClose}
          isOpen={isOpen}
          submit={handleSubmit}
        >
          <DialogContentText>Search professionals</DialogContentText>
          <Autocomplete
            value={selectedProfessional}
            onChange={handleOnChangeAutocomplete}
            options={availableProfessionals}
            getOptionLabel={handleGetOptionLabel}
            renderInput={handleRenderInputAutocomplete}
          />
          <TextField
            label="Role"
            onChange={handleRoleChange}
            sx={{ flex: 1, mr: 1 }}
          />
        </Dialog>
      )}
    </Box>
  );
};
