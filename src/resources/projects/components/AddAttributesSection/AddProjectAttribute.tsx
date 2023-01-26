import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  Chip,
  createFilterOptions,
  FilterOptionsState,
  TextField,
  Typography,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
} from '@mui/material';
import Dialog from 'components/Dialog';
import { useCreateAttribute } from 'hooks';
import {
  CreateAttributeRequest,
  ParsedProjectAttribute,
  ParsedProjectAttributedMap,
} from 'types';
import { useNotify } from 'react-admin';

type FilterOptions = ParsedProjectAttribute & {
  inputValue: string;
};

const filter = createFilterOptions<FilterOptions>();

const createOptions = (
  attributes: ParsedProjectAttribute[],
): FilterOptions[] => {
  return attributes.map((attribute: ParsedProjectAttribute) => ({
    ...attribute,
    inputValue: attribute.name,
  }));
};

type AddProjectAttributeProps = {
  projectAttributes: ParsedProjectAttribute[];
  allAttributes: ParsedProjectAttribute[];
  attributeTypeName: string;
  attributeTypeId: string;
  setProjectAttributes: Dispatch<SetStateAction<ParsedProjectAttributedMap>>;
};

const AddProjectAttribute: FC<AddProjectAttributeProps> = ({
  projectAttributes,
  allAttributes,
  attributeTypeName,
  attributeTypeId,
  setProjectAttributes,
}) => {
  const notify = useNotify();
  const { createAttribute } = useCreateAttribute();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState('');

  const selectedOptions = useMemo(
    () => createOptions(projectAttributes),
    [projectAttributes],
  );
  const allOptions = useMemo(
    () => createOptions(allAttributes),
    [allAttributes],
  );

  const handleCloseDialog = useCallback(() => {
    setDialogValue('');
    setIsOpen(false);
  }, []);

  const createNewAttributeType = async () => {
    const newAttribute: CreateAttributeRequest = {
      name: dialogValue,
      typeId: attributeTypeId,
    };
    const response = await createAttribute(newAttribute);

    if (!response) {
      notify('Error creating new attribute', { type: 'error' });
      return;
    }

    const newProjectAttributes: ParsedProjectAttribute = {
      name: response.name,
      attributeTypeId: attributeTypeId,
      id: response.id,
      from: new Date(),
      to: new Date(),
    };

    setProjectAttributes((prev: ParsedProjectAttributedMap) => ({
      ...prev,
      [attributeTypeName]: [...prev[attributeTypeName], newProjectAttributes],
    }));

    setIsOpen(false);
  };

  const handleChange = useCallback(
    (
      _: unknown,
      newValue: (string | ParsedProjectAttribute)[],
      reason: string,
      details: unknown,
    ) => {
      if (typeof newValue === 'string') return;
      const { option } = details as AutocompleteChangeDetails<
        ParsedProjectAttribute & { inputValue: string }
      >;
      const attr = newValue as ParsedProjectAttribute[];
      if (reason === 'removeOption') {
        // removeOption is when the user clicks the x on a tag
        setProjectAttributes((prev: ParsedProjectAttributedMap) => ({
          ...prev,
          [attributeTypeName]: attr,
        }));
      } else if (!option.id) {
        // when option is undefined, it means that it's a new attribute
        setIsOpen(true);
        const inputValue = option as { inputValue: string };
        setDialogValue(inputValue.inputValue);
      } else {
        // otherwise, it's an existing attribute
        setProjectAttributes((prev: ParsedProjectAttributedMap) => ({
          ...prev,
          [attributeTypeName]: attr,
        }));
      }
    },
    [setProjectAttributes, attributeTypeName],
  );

  const handleOnKeyDown = useCallback((e: unknown) => {
    const event = e as {
      defaultMuiPrevented: boolean;
      key: string;
    };
    if (event.key === 'Enter') {
      event.defaultMuiPrevented = true;
    }
  }, []);

  const handleFilterOptions = useCallback(
    (options: FilterOptions[], params: FilterOptionsState<FilterOptions>) => {
      const filtered = filter(options, params);

      if (params.inputValue !== '') {
        filtered.push({
          inputValue: params.inputValue,
          name: `Add to ${attributeTypeName}: "${params.inputValue}"`,
          id: '',
          type: {
            id: '',
            name: '',
          },
          attributeTypeId: '',
          from: new Date(),
          to: new Date(),
        });
      }

      return filtered;
    },
    [attributeTypeName],
  );

  const handleGetOptionLabel = useCallback(
    (option: string | ParsedProjectAttribute) => {
      if (typeof option === 'string') {
        return option;
      }
      return option.name;
    },
    [],
  );

  const handleRenderTags = useCallback(
    (
      tagValue: ParsedProjectAttribute[],
      getTagProps: AutocompleteRenderGetTagProps,
    ) =>
      tagValue.map((option: ParsedProjectAttribute, index) => (
        <Chip
          size="medium"
          label={option.name}
          {...getTagProps({ index })}
          key={option.id}
        />
      )),
    [attributeTypeName, setProjectAttributes],
  );

  const handleRenderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField {...params} label={`Add ${attributeTypeName}`} />
    ),
    [attributeTypeName],
  );

  const handleIsOptionEqualToValue = useCallback(
    (option: ParsedProjectAttribute, value: ParsedProjectAttribute) =>
      option.id === value.id,
    [],
  );

  return (
    <>
      <Autocomplete
        value={selectedOptions}
        onKeyDown={handleOnKeyDown}
        freeSolo
        multiple
        options={allOptions}
        onChange={handleChange}
        filterOptions={handleFilterOptions}
        getOptionLabel={handleGetOptionLabel}
        filterSelectedOptions
        renderTags={handleRenderTags}
        renderInput={handleRenderInput}
        isOptionEqualToValue={handleIsOptionEqualToValue}
      />
      <Dialog
        closeText="Cancel"
        submitText="Create"
        dialogTitle={`Create new ${attributeTypeName}`}
        close={handleCloseDialog}
        isOpen={isOpen}
        submit={createNewAttributeType}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {dialogValue}
        </Typography>
      </Dialog>
    </>
  );
};

export default AddProjectAttribute;
