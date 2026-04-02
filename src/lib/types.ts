import type { DateTime } from 'luxon';

/** Calendar UI shape after mapping DB rows with Luxon dates */
export type CalendarEventView = {
	id: number;
	title: string;
	type: string;
	description: string | null;
	location: string | null;
	date: DateTime;
	start: DateTime;
	end: DateTime;
};
