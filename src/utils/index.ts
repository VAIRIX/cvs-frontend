export const formatDate = (date: string) => {
  return date ? date.split('T')[0] : '';
};
