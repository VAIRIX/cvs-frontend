import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { Loading, useGetList } from 'react-admin';
import AddProfessionalAttribute from './AddProfessionalAttribute';
import { parseUnassignedProfessionalAttributes } from 'utils';
import { ParsedProfessionalAttributedMap } from 'types';

type AddAttributesSectionProps = {
  professionalAttributes: ParsedProfessionalAttributedMap;
  setProfessionalAttributes: Dispatch<
    SetStateAction<ParsedProfessionalAttributedMap>
  >;
};

const AddAttributesSection: FC<AddAttributesSectionProps> = ({
  professionalAttributes,
  setProfessionalAttributes,
}) => {
  const { data: allAttributes, isLoading: isLoadingAttributes } =
    useGetList('attributes');

  const { data: attributeTypes, isLoading: isLoadingAttributeTypes } =
    useGetList('attributes/types');

  const parsedAllAttributes = useMemo(
    () => parseUnassignedProfessionalAttributes(allAttributes),
    [allAttributes],
  );

  if (isLoadingAttributes || isLoadingAttributeTypes) return <Loading />;

  return (
    <>
      {attributeTypes?.map((attributeType) => {
        return (
          <AddProfessionalAttribute
            key={attributeType?.id}
            professionalAttributes={
              professionalAttributes[attributeType.name] || []
            }
            allAttributes={parsedAllAttributes[attributeType.name]}
            attributeTypeName={attributeType.name}
            attributeTypeId={attributeType.id}
            setProfessionalAttributes={setProfessionalAttributes}
          />
        );
      })}
    </>
  );
};

export default AddAttributesSection;
