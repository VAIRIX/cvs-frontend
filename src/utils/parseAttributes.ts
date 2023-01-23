import {
  ParsedProfessionalAttributedMap,
  ParsedProjectAttributedMap,
  ProfessionalAttributeResponse,
  ProjectAttributeResponse,
} from 'types';

export const parseProfessionalAttributes = (
  attributes: ProfessionalAttributeResponse[] | undefined,
): ParsedProfessionalAttributedMap => {
  if (!attributes) return {};
  const attributesByType: ParsedProfessionalAttributedMap = {};
  attributes?.forEach((professionalAttribute) => {
    const { attribute } = professionalAttribute;
    const { type } = attribute;
    const { name: attributeTypeName } = type;
    if (!attributesByType[attributeTypeName]) {
      attributesByType[attributeTypeName] = [];
    }
    attributesByType[attributeTypeName].push({
      id: attribute.id,
      attributeTypeId: type.id,
      level: professionalAttribute.level,
      name: attribute.name,
    });
  });
  return attributesByType;
};

export const parseProjectAttributes = (
  attributes: ProjectAttributeResponse[] | undefined,
): ParsedProjectAttributedMap => {
  if (!attributes) return {};
  const attributesByType: ParsedProjectAttributedMap = {};
  attributes?.forEach((projectAttribute) => {
    const { attribute } = projectAttribute;
    const { type } = attribute;
    const { name: attributeTypeName } = type;
    if (!attributesByType[attributeTypeName]) {
      attributesByType[attributeTypeName] = [];
    }
    attributesByType[attributeTypeName].push({
      id: attribute.id,
      attributeTypeId: type.id,
      from: projectAttribute.from,
      to: projectAttribute.to,
      name: attribute.name,
    });
  });
  return attributesByType;
};
