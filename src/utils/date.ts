import { format, formatDistance } from 'date-fns';

export const formatDate = (date: string) => {
  return date ? date.split('T')[0] : '';
};

export const formatProjectDates = (from: string, to: string) => {
  const startDate = new Date(from);
  const endDate = new Date(to);
  const duration = formatDistance(startDate, endDate);

  return `${format(startDate, 'MMMM yyyy')} - ${format(
    endDate,
    'MMMM yyyy',
  )} (${duration})`;
};
