export const addSource = <T extends object>(source: keyof T) => {
  return source as string;
};
