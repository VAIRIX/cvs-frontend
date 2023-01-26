export type ProfessionalAttributeResponse = {
  id: string;
  attribute: AttributeResponse;
  level: number;
};

export type ProjectAttributeResponse = {
  attribute: AttributeResponse;
  from: Date;
  to: Date;
};

export type AttributeTypeResponse = {
  id: string;
  name: string;
};

export type AttributeResponse = {
  id: string;
  name: string;
  type: AttributeTypeResponse;
};

export type ParsedProfessionalAttributedMap = {
  [key: string]: ParsedProfessionalAttribute[];
};

export type ParsedProjectAttributedMap = {
  [key: string]: ParsedProjectAttribute[];
};

export type ParsedAttributedMap = {
  [key: string]: ParsedAttribute[];
};

export type ParsedAttribute = {
  id: string;
  attributeTypeId: string;
  name: string;
};

export type ParsedProfessionalAttribute = ParsedAttribute & {
  level: number;
};

export type ParsedProjectAttribute = ParsedAttribute & {
  from: Date;
  to: Date;
};

export type CreateAttributeRequest = {
  name: string;
  typeId: string;
};
