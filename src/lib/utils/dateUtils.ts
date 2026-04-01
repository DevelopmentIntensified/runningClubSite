import { DateTime } from "luxon";

export const getDaysInMonth = (year: number, month: number) => {
  return DateTime.fromObject({ year, month }, { zone: 'America/New_York' }).daysInMonth
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  console.log(year, month)
  console.log(DateTime.fromObject({ year, month, day: 1, }, { zone: 'America/New_York' }))
  return DateTime.fromObject({ year, month, day: 1 }, { zone: 'America/New_York' }).weekday
};

export const formatDate = (date: DateTime) => {
  return date.setZone('America/New_York').toFormat('MM-dd-yyyy');
};

export const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};
