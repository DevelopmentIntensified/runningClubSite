<script lang="ts">
  import { goto } from '$app/navigation';
  import { DateTime } from 'luxon';

  export let data;
  const event = data.event;

  function goBack() {
    goto('/schedule');
  }

  const startDt = DateTime.fromJSDate(new Date(event.start));
  const endDt = DateTime.fromJSDate(new Date(event.end));

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

  function downloadEventICS() {
    const now = formatICSDate(DateTime.now());
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Liberty Running Club//Event//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDt)}`,
      `DTEND:${formatICSDate(endDt)}`,
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

  function getGoogleCalendarUrl(): string {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
      text: event.title,
      dates: `${startDt.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}/${endDt.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}`,
      details: event.description || '',
      location: event.location || '',
    });
    return `${baseUrl}&${params.toString()}`;
  }
</script>

<div class="container mx-auto p-4">
  <button onclick={goBack} class="mb-4 flex items-center text-primary-700 hover:text-primary-800">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-1 h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg
    >
    Back to Calendar
  </button>
  <div class="rounded-lg bg-white p-6 shadow-lg ">
    <h1 class="mb-4 text-3xl font-bold text-gray-800 ">{event.title}</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <p class="text-gray-600 "><strong>Date:</strong> {DateTime.fromJSDate(event.date).setZone('America/New_York').toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
        <p class="text-gray-600 ">
          <strong>Time:</strong>
          {DateTime.fromJSDate(event.start).setZone('America/New_York').toLocaleString(DateTime.TIME_SIMPLE)} - {DateTime.fromJSDate(event.end).setZone('America/New_York').toLocaleString(DateTime.TIME_SIMPLE)}
        </p>
        <p class="text-gray-600 "><strong>Location:</strong> {event.location}</p>
        <p class="text-gray-600 "><strong>Type:</strong> {event.type}</p>
      </div>
      <div>
        <h2 class="mb-2 text-xl font-semibold text-gray-800 ">Description</h2>
        <p class="mb-2 text-gray-700 ">{event.description}</p>
        {#if event.type.includes('Indoor')}
          <span class="rounded bg-orange-300 p-1">Indoor Race</span>
        {:else if !event.type.includes('Social') && !event.type.includes('Practice')}
          <span class="rounded bg-yellow-300 p-1">Outdoor Race</span>
        {/if}
        {#if event.type.includes('NIRCA')}
          <span class="rounded bg-red-300 p-1">{event.type}</span>
        {/if}
        {#if event.type.includes('NCAA')}
          <span class="rounded bg-blue-300 p-1">{event.type}</span>
        {/if}
        {#if event.type.includes('Social')}
          <span class="rounded bg-purple-300 p-1">{event.type}</span>
        {/if}
        {#if event.type.includes('Trail Race')}
          <span class="rounded bg-green-300 p-1">{event.type}</span>
        {/if}
        {#if event.type.includes('Road Race')}
          <span class="rounded bg-amber-300 p-1">{event.type}</span>
        {/if}
        <div class="mt-4 flex flex-wrap gap-2">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Add to Google Calendar
          </a>
          <button
            onclick={downloadEventICS}
            class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download for Apple/Other Calendar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
