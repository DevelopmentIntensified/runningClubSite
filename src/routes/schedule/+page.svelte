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

  <div class="mb-6">
    <button
      onclick={downloadICS}
      class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download All Events (.ics)
    </button>
  </div>

  <Calendar {currentDate} {events} />
</div>
