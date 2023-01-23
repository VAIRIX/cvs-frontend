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
import Level from 'components/Level';
import { useCreateAttribute } from 'hooks';
import {
  CreateAttributeRequest,
  ParsedProfessionalAttribute,
  ParsedProfessionalAttributedMap,
} from 'types';
import { useNotify } from 'react-admin';
import { DEFAULT_ATTRIBUTE_LEVEL } from 'constants/index';

type FilterOptions = ParsedProfessionalAttribute & {
  inputValue: string;
};

const filter = createFilterOptions<FilterOptions>();

const createOptions = (
  attributes: ParsedProfessionalAttribute[],
): FilterOptions[] => {
  console.log(123);
  return attributes.map((attribute: ParsedProfessionalAttribute) => ({
    ...attribute,
    inputValue: attribute.name,
  }));
};

type AddProfessionalAttributeProps = {
  professionalAttributes: ParsedProfessionalAttribute[];
  allAttributes: ParsedProfessionalAttribute[];
  attributeTypeName: string;
  attributeTypeId: string;
  setProfessionalAttributes: Dispatch<
    SetStateAction<ParsedProfessionalAttributedMap>
  >;
};

const AddProfessionalAttribute: FC<AddProfessionalAttributeProps> = ({
  professionalAttributes,
  allAttributes,
  attributeTypeName,
  attributeTypeId,
  setProfessionalAttributes,
}) => {
  const notify = useNotify();
  const { createAttribute } = useCreateAttribute();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState('');

  const selectedOptions = useMemo(
    () => createOptions(professionalAttributes),
    [professionalAttributes],
  );
  const allOptions = useMemo(
    () => createOptions(allAttributes),
    [allAttributes],
  );

  const handleCloseDialog = () => {
    setDialogValue('');
    setIsOpen(false);
  };

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

    const newProfessionalAttributes: ParsedProfessionalAttribute = {
      level: DEFAULT_ATTRIBUTE_LEVEL,
      name: response.name,
      attributeTypeId: attributeTypeId,
      id: response.id,
    };

    setProfessionalAttributes((prev: ParsedProfessionalAttributedMap) => ({
      ...prev,
      [attributeTypeName]: [
        ...prev[attributeTypeName],
        newProfessionalAttributes,
      ],
    }));

    setIsOpen(false);
  };

  const handleChange = useCallback(
    (
      _: unknown,
      newValue: (string | ParsedProfessionalAttribute)[],
      reason: string,
      details: unknown,
    ) => {
      if (typeof newValue === 'string') return;
      const { option } = details as AutocompleteChangeDetails<
        ParsedProfessionalAttribute & { inputValue: string }
      >;
      const attr = newValue as ParsedProfessionalAttribute[];
      if (reason === 'removeOption') {
        // removeOption is when the user clicks the x on a tag
        setProfessionalAttributes((prev: ParsedProfessionalAttributedMap) => ({
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
        setProfessionalAttributes((prev: ParsedProfessionalAttributedMap) => ({
          ...prev,
          [attributeTypeName]: attr,
        }));
      }
    },
    [setProfessionalAttributes, attributeTypeName],
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
          level: DEFAULT_ATTRIBUTE_LEVEL,
          id: '',
          attributeTypeId: '',
        });
      }

      return filtered;
    },
    [attributeTypeName],
  );

  const handleGetOptionLabel = useCallback(
    (option: string | ParsedProfessionalAttribute) => {
      if (typeof option === 'string') {
        return option;
      }
      return option.name;
    },
    [],
  );

  const handleRenderTags = useCallback(
    (
      tagValue: ParsedProfessionalAttribute[],
      getTagProps: AutocompleteRenderGetTagProps,
    ) =>
      tagValue.map((option: ParsedProfessionalAttribute, index) => (
        <Chip
          size="medium"
          avatar={
            <Level
              maxLevel={5}
              level={option.level}
              setLevel={(level) => {
                setProfessionalAttributes(
                  (prev: ParsedProfessionalAttributedMap) => ({
                    ...prev,
                    [attributeTypeName]: tagValue.map((tag, i) => {
                      if (i === index) {
                        return {
                          ...tag,
                          level,
                        };
                      }
                      return tag;
                    }),
                  }),
                );
              }}
            />
          }
          label={option.name}
          {...getTagProps({ index })}
          key={option.id}
        />
      )),
    [attributeTypeName, setProfessionalAttributes],
  );

  const handleRenderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField {...params} label={`Add ${attributeTypeName}`} />
    ),
    [attributeTypeName],
  );

  const handleIsOptionEqualToValue = useCallback(
    (option: ParsedProfessionalAttribute, value: ParsedProfessionalAttribute) =>
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

export default AddProfessionalAttribute;
