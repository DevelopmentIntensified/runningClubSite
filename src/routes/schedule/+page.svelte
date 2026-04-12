<script lang="ts">
  import { writable } from 'svelte/store';
  import Calendar from '$lib/components/Calendar.svelte';
  import type { CalendarEventView } from '$lib/types';
  import { DateTime } from 'luxon';
  import type { PageData } from './$types';

  export let data: PageData;

  type ScheduleEventRow = {
    id: number;
    title: string;
    type: string;
    description: string | null;
    location: string | null;
    created_at: Date;
    date: Date;
    start: string | Date;
    end: string | Date;
  };

  const currentDate = writable(DateTime.now().setZone('America/New_York'));

  let events: CalendarEventView[] = (data.events as ScheduleEventRow[]).map((e) => ({
    ...e,
    date: DateTime.fromJSDate(e.date instanceof Date ? e.date : new Date(e.date)),
    start: DateTime.fromJSDate(new Date(e.start)),
    end: DateTime.fromJSDate(new Date(e.end))
  }));

  function formatICSDate(dt: DateTime): string {
    return dt.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
  }

  function escapeICS(str: string): string {
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

  function downloadICS() {
    const now = formatICSDate(DateTime.now());
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Liberty Running Club//Schedule//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];

    for (const event of data.events as ScheduleEventRow[]) {
      const start = DateTime.fromJSDate(new Date(event.start));
      const end = DateTime.fromJSDate(new Date(event.end));
      icsContent.push(
        'BEGIN:VEVENT',
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
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

  function getGoogleCalendarUrl(): string {
    const events = data.events as ScheduleEventRow[];
    if (events.length === 0) return '';

    const firstEvent = events[0];
    const start = DateTime.fromJSDate(new Date(firstEvent.start));
    const end = DateTime.fromJSDate(new Date(firstEvent.end));

    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
      text: firstEvent.title,
      dates: `${start.toFormat("yyyyMMdd'T'HHmmss'Z'")}/${end.toFormat("yyyyMMdd'T'HHmmss'Z'")}`,
      details: firstEvent.description || '',
      location: firstEvent.location || '',
    });

    return `${baseUrl}&${params.toString()}`;
  }
</script>

<svelte:head>
  <title>Schedule - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="relative mb-8 h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80">
    <img
      src={data.image.imageUrl}
      alt={data.image.alt}
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60">
      <div class="px-4 text-center">
        <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Schedule</h1>
        <p class="mt-2 text-sm text-white/90 sm:text-base">Weekly and season events in calendar view.</p>
      </div>
    </div>
  </div>

  <div class="mb-6 flex flex-wrap gap-3">
    <button
      onclick={downloadICS}
      class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download .ics
    </button>
    <a
      href={getGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Add to Google Calendar
    </a>
  </div>

  <Calendar {currentDate} {events} />
</div>
