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

export type ParsedProfessionalAttribute = {
  id: string;
  name: string;
  level: number;
  attributeTypeId: string;
};

export type ParsedProjectAttribute = {
  id: string;
  name: string;
  from: Date;
  to: Date;
  attributeTypeId: string;
};
