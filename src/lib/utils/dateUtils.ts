import { DateTime } from 'luxon';

export const getDaysInMonth = (year: number, month: number): number => {
  return DateTime.fromObject({ year, month }, { zone: 'America/New_York' }).daysInMonth ?? 31;
};

/** Leading empty cells for a Sunday-first row (Luxon: Mon=1 … Sun=7). */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  const wd = DateTime.fromObject({ year, month, day: 1 }, { zone: 'America/New_York' }).weekday;
  return wd === 7 ? 0 : wd;
};

export const formatDate = (date: DateTime) => {
  return date.setZone('America/New_York').toFormat('MM-dd-yyyy');
};

export const parseDate = (dateString: string) => {
  const [y, m, d] = dateString.split('-').map(Number);
  return new Date(y, m - 1, d);
};
