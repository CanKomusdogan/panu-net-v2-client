import { format } from 'date-fns';

export const formatDateTime = (str: string, formatStr?: string) => {
  const date = new Date(str);

  if (date.toString() === 'Invalid Date') return str;

  return format(date, formatStr || 'dd.MM.yyyy HH:mm:ss');
};
