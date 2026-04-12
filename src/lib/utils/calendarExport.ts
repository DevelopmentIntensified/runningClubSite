import { DateTime } from 'luxon';

export interface CalendarEvent {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  start: DateTime;
  end: DateTime;
}

export function formatICSDate(dt: DateTime): string {
  return dt.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}

export function escapeICS(str: string): string {
  return str.replace(/[\\;,\n]/g, (match) => {
    switch (match) {
      case '\\': return '\\\\';
      case ';': return '\\;';
      case ',': return '\\,';
      case '\n': return '\\n';
      default: return match;
    }
  });
}

export function downloadICS(event: CalendarEvent): void {
  const now = formatICSDate(DateTime.now());
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Liberty Running Club//Event//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(event.start)}`,
    `DTEND:${formatICSDate(event.end)}`,
    `DTSTAMP:${now}`,
    `UID:${event.id}@libertyrunningclub.com`,
    `SUMMARY:${escapeICS(event.title)}`,
    event.location ? `LOCATION:${escapeICS(event.location)}` : '',
    event.description ? `DESCRIPTION:${escapeICS(event.description)}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export function getSchoolYearEvents(events: CalendarEvent[]): CalendarEvent[] {
  const now = DateTime.now();
  const year = now.month >= 8 ? now.year : now.year - 1;
  const startOfYear = DateTime.fromObject({ year, month: 8, day: 1 }, { zone: 'America/New_York' });
  const endOfYear = DateTime.fromObject({ year: year + 1, month: 5, day: 31 }, { zone: 'America/New_York' });

  return events.filter(event => {
    const eventDate = event.start;
    return eventDate >= startOfYear && eventDate <= endOfYear;
  });
}

export function downloadSchoolYearEventsICS(events: CalendarEvent[]): void {
  const schoolYearEvents = getSchoolYearEvents(events);
  
  if (schoolYearEvents.length === 0) {
    alert('No events found for the current school year (August - May)');
    return;
  }

  const now = formatICSDate(DateTime.now());
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Liberty Running Club//Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const event of schoolYearEvents) {
    icsContent.push(
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(event.start)}`,
      `DTEND:${formatICSDate(event.end)}`,
      `DTSTAMP:${now}`,
      `UID:${event.id}@libertyrunningclub.com`,
      `SUMMARY:${escapeICS(event.title)}`,
      event.location ? `LOCATION:${escapeICS(event.location)}` : '',
      event.description ? `DESCRIPTION:${escapeICS(event.description)}` : '',
      'END:VEVENT'
    );
  }

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'liberty-running-club-schedule.ics';
  link.click();
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event: CalendarEvent): string {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const params = new URLSearchParams({
    text: event.title,
    dates: `${event.start.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}/${event.end.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z")}`,
    details: event.description || '',
    location: event.location || '',
  });
  return `${baseUrl}&${params.toString()}`;
}
