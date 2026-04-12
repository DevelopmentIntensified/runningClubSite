<script lang="ts">
  import { DateTime } from 'luxon';
  import type { Writable } from 'svelte/store';
  import type { CalendarEventView } from '$lib/types';

  export let currentDate: Writable<DateTime>;
  export let events: CalendarEventView[];
  export let isAdmin = false;

  let hoveredEvent: number | null = null;

  $: year = $currentDate.year;
  $: month = $currentDate.month;

  $: filteredEvents = events
    .filter((event) => {
      const eventDate = event.date;
      return eventDate.year === year && eventDate.month === month;
    })
    .sort((a, b) => a.date.toUnixInteger() - b.date.toUnixInteger());

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

  function downloadEventICS(event: CalendarEventView) {
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

  function getGoogleCalendarUrl(event: CalendarEventView): string {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams({
      text: event.title,
      dates: `${event.start.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}/${event.end.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'")}`,
      details: event.description || '',
      location: event.location || '',
    });
    return `${baseUrl}&${params.toString()}`;
  }
</script>

<div class="space-y-3">
  {#if filteredEvents.length === 0}
    <div class="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p class="font-medium text-slate-600">No events this month.</p>
      <p class="mt-1 text-sm text-slate-500">Try another month or switch to month view.</p>
    </div>
  {/if}
  {#each filteredEvents as event}
    <div
      class="relative"
      onmouseenter={() => hoveredEvent = event.id}
      onmouseleave={() => hoveredEvent = null}
      role="group"
    >
      <a
        href={isAdmin ? `/admin/events/edit/${event.id}` : `/schedule/event/${event.id}`}
        class="block"
      >
        <div
          class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:border-primary-200 hover:shadow-md"
        >
          <div class="mb-2 flex flex-wrap items-start justify-between gap-2">
            <h3 class="text-lg font-semibold text-slate-900">{event.title}</h3>
          </div>
          <p class="mb-1 text-sm text-slate-600">
            {event.date.setZone('America/New_York').toLocaleString(DateTime.DATETIME_SHORT)}
          </p>
          {#if event.location}
            <p class="mb-2 text-sm text-slate-600">{event.location}</p>
          {/if}
          {#if event.description}
            <p class="mb-3 text-slate-700">{event.description}</p>
          {/if}
          <div class="flex flex-wrap gap-1.5">
            {#if event.type.includes('Indoor')}
              <span class="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-900">Indoor Race</span>
            {:else if event.type.includes('Practice')}
              <span class="rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-900">Practice</span>
            {:else if !event.type.includes('Social')}
              <span class="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">Outdoor Race</span>
            {/if}
            {#if event.type.includes('NIRCA')}
              <span class="rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-900">{event.type}</span>
            {/if}
            {#if event.type.includes('NCAA')}
              <span class="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-900">{event.type}</span>
            {/if}
            {#if event.type.includes('Social')}
              <span class="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-900">{event.type}</span>
            {/if}
            {#if event.type.includes('Trail Race')}
              <span class="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900">{event.type}</span>
            {/if}
            {#if event.type.includes('Road Race')}
              <span class="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">{event.type}</span>
            {/if}
          </div>
        </div>
      </a>

      {#if hoveredEvent === event.id}
        <div 
          class="absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border border-slate-200 bg-white p-4 shadow-lg"
          onmouseenter={() => hoveredEvent = event.id}
          onmouseleave={() => hoveredEvent = null}
          role="tooltip"
        >
          <h4 class="mb-2 font-semibold text-slate-900">{event.title}</h4>
          <p class="mb-1 text-sm text-slate-600">
            {event.start.toLocaleString(DateTime.DATETIME_FULL)}
          </p>
          {#if event.location}
            <p class="mb-2 text-sm text-slate-600">{event.location}</p>
          {/if}
          {#if event.description}
            <p class="mb-3 text-sm text-slate-700">{event.description}</p>
          {/if}
          <div class="flex flex-wrap gap-2">
            <a
              href={getGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600"
            >
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Calendar
            </a>
            <button
              onclick={() => downloadEventICS(event)}
              class="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-700"
            >
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Apple/Other Calendar
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
