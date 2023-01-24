import { DEFAULT_ATTRIBUTE_LEVEL } from 'constants/index';
import {
  AttributeResponse,
  ParsedProfessionalAttributedMap,
  ParsedProjectAttributedMap,
  ProfessionalAttributeResponse,
  ProjectAttributeResponse,
} from 'types';

export const parseProfessionalAttributes = (
  attributes: ProfessionalAttributeResponse[] | undefined,
): ParsedProfessionalAttributedMap => {
  if (!attributes?.length) return {};
  const attributesByType: ParsedProfessionalAttributedMap = {};
  attributes?.forEach((professionalAttribute) => {
    const { attribute } = professionalAttribute;
    pushParsedAttribute(
      attribute,
      attributesByType,
      professionalAttribute.level,
    );
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

export const parseUnassignedProfessionalAttributes = (
  attributes: AttributeResponse[] | undefined,
): ParsedProfessionalAttributedMap => {
  if (!attributes?.length) return {};
  const attributesByType: ParsedProfessionalAttributedMap = {};
  attributes?.forEach((attribute) => {
    pushParsedAttribute(attribute, attributesByType, DEFAULT_ATTRIBUTE_LEVEL);
  });
  return attributesByType;
};

const pushParsedAttribute = (
  attribute: AttributeResponse,
  attributesByType: ParsedProfessionalAttributedMap,
  level: number,
): void => {
  const { type, name, id } = attribute;
  const { id: attributeTypeId, name: attributeTypeName } = type;
  if (!attributesByType[attributeTypeName]) {
    attributesByType[attributeTypeName] = [];
  }
  attributesByType[attributeTypeName].push({
    id,
    attributeTypeId,
    name,
    level,
  });
};
