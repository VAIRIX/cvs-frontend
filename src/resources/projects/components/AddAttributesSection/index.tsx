import { RESOURCES } from 'api/resources';
import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { Loading, useGetList } from 'react-admin';
import { ParsedProjectAttributedMap } from 'types';
import { parseUnassignedProjectAttributes } from 'utils';
import AddProjectAttribute from './AddProjectAttribute';

type AddAttributesSectionProps = {
  projectAttributes: ParsedProjectAttributedMap;
  setProjectAttributes: Dispatch<SetStateAction<ParsedProjectAttributedMap>>;
};

const AddAttributesSection: FC<AddAttributesSectionProps> = ({
  projectAttributes,
  setProjectAttributes,
}) => {
  const { data: allAttributes, isLoading: isLoadingAttributes } = useGetList(
    RESOURCES.ATTRIBUTES,
  );

  const { data: attributeTypes, isLoading: isLoadingAttributeTypes } =
    useGetList(RESOURCES.ATTRIBUTE_TYPES);

  const parsedAllAttributes = useMemo(
    () => parseUnassignedProjectAttributes(allAttributes),
    [allAttributes],
  );

  if (isLoadingAttributes || isLoadingAttributeTypes) return <Loading />;

  return (
    <>
      {attributeTypes?.map((attributeType) => {
        return (
          <AddProjectAttribute
            key={attributeType?.id}
            projectAttributes={projectAttributes[attributeType.name] || []}
            allAttributes={parsedAllAttributes[attributeType.name]}
            attributeTypeName={attributeType.name}
            attributeTypeId={attributeType.id}
            setProjectAttributes={setProjectAttributes}
          />
        );
      })}
    </>
  );
};

export default AddAttributesSection;
