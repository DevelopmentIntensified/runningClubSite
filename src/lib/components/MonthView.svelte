<script lang="ts">
  import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '$lib/utils/dateUtils';
  import type { CalendarEventView } from '$lib/types';
  import type { Writable } from 'svelte/store';
  import { DateTime } from 'luxon';
  import { enhance } from '$app/forms';

  export let currentDate: Writable<DateTime>;
  export let events: CalendarEventView[];
  export let isAdmin = false;

  let deletingId: number | null = null;
  let hoveredEvent: CalendarEventView | null = null;
  let hoverPosition: { x: number; y: number } = { x: 0, y: 0 };

  $: year = $currentDate.year;
  $: month = $currentDate.month;
  $: daysInMonth = getDaysInMonth(year, month);
  $: firstDayOfMonth = getFirstDayOfMonth(year, month);

  $: days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  $: emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const colors: Record<string, string> = {
    NIRCA: 'bg-red-100 text-red-900 ring-red-200/80',
    NCAA: 'bg-blue-100 text-blue-900 ring-blue-200/80',
    Social: 'bg-purple-100 text-purple-900 ring-purple-200/80',
    Trail: 'bg-emerald-100 text-emerald-900 ring-emerald-200/80',
    Road: 'bg-teal-100 text-teal-900 ring-teal-200/80',
    Practice: 'bg-yellow-100 text-yellow-900 ring-yellow-200/80'
  };

  function chipClass(type: string): string {
    const key = Object.keys(colors).find((k) => type.includes(k));
    return colors[key ?? ''] ?? 'bg-slate-100 text-slate-800 ring-slate-200/80';
  }

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

  function handleEventHover(event: CalendarEventView, e: MouseEvent) {
    hoveredEvent = event;
    hoverPosition = { x: e.clientX, y: e.clientY };
  }

  function handleEventLeave() {
    hoveredEvent = null;
  }
</script>

<div class="mb-6 flex flex-wrap gap-2 text-xs sm:text-sm">
  <span
    class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 font-medium text-yellow-900 ring-1 ring-yellow-200/80"
    >Practice</span
  >
  <span
    class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 font-medium text-red-900 ring-1 ring-red-200/80"
    >NIRCA</span
  >
  <span
    class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 font-medium text-blue-900 ring-1 ring-blue-200/80"
    >NCAA</span
  >
  <span
    class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-1 font-medium text-purple-900 ring-1 ring-purple-200/80"
    >Social</span
  >
  <span
    class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-900 ring-1 ring-emerald-200/80"
    >Trail Race</span
  >
  <span
    class="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-1 font-medium text-teal-900 ring-1 ring-teal-200/80"
    >Road Race</span
  >
</div>

<div class="overflow-x-auto rounded-xl ring-1 ring-slate-200/80">
  <div class="grid min-w-[320px] grid-cols-7 gap-px bg-slate-200">
    {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
      <div
        class="bg-slate-100 px-1 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-2 sm:text-sm"
      >
        {day}
      </div>
    {/each}
    {#each emptyDays as _}
      <div class="min-h-[5.5rem] bg-slate-50/80 sm:min-h-[6.5rem]"></div>
    {/each}
    {#each days as day}
      {@const date = DateTime.fromObject({ year, month, day }, { zone: 'America/New_York' }).toFormat('yyyy-MM-dd')}
      {@const dayEvents = events.filter((event) => event.date.toFormat('yyyy-MM-dd') === date)}
      <div
        class="group min-h-[5.5rem] border-t border-transparent bg-white p-1.5 transition-colors hover:bg-slate-50/90 sm:min-h-[6.5rem] sm:p-2"
      >
        <div class="mb-1 flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 sm:text-sm">{day}</span>
          {#if isAdmin}
            <a
              href="/admin/events/new?date={date}"
              class="rounded p-0.5 text-primary-600 opacity-0 transition-opacity hover:bg-primary-50 group-hover:opacity-100"
              title="Add event on this day"
            >
              <svg
                class="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </a>
          {/if}
        </div>
        <div class="flex flex-col gap-1">
          {#each dayEvents as event}
            <div class="group flex min-w-0 items-center gap-1">
              <button
                onmouseenter={(e) => handleEventHover(event, e)}
                onmouseleave={handleEventLeave}
                class="min-w-0 flex-1 cursor-pointer"
              >
                <div
                  class="truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 sm:text-xs {chipClass(
                    event.type
                  )}"
                >
                  {event.title}
                </div>
              </button>
              {#if isAdmin}
                <form
                  method="POST"
                  action="/admin/events?/deleteEvent"
                  use:enhance={() => {
                    deletingId = event.id;
                    return async ({ update }) => {
                      await update();
                      deletingId = null;
                    };
                  }}
                  class="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <input type="hidden" name="id" value={event.id} />
                  <button
                    type="submit"
                    disabled={deletingId === event.id}
                    class="rounded p-0.5 text-red-600 hover:bg-red-50"
                    title="Delete event"
                  >
                    {#if deletingId === event.id}
                      <svg class="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    {:else}
                      <svg
                        class="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    {/if}
                  </button>
                </form>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

{#if hoveredEvent}
  <div
    class="fixed z-50 rounded-lg border border-slate-200 bg-white p-4 shadow-xl"
    style="left: {Math.min(hoverPosition.x + 10, window.innerWidth - 280)}px; top: {hoverPosition.y + 10}px; max-width: 260px;"
  >
    <a
      href={isAdmin ? `/admin/events/edit/${hoveredEvent.id}` : `/schedule/event/${hoveredEvent.id}`}
      class="block"
    >
      <h4 class="mb-2 font-semibold text-slate-900 hover:text-primary-600">{hoveredEvent.title}</h4>
    </a>
    <p class="mb-1 text-sm text-slate-600">
      {hoveredEvent.start.toLocaleString(DateTime.DATETIME_FULL)}
    </p>
    {#if hoveredEvent.location}
      <p class="mb-2 text-sm text-slate-600">{hoveredEvent.location}</p>
    {/if}
    {#if hoveredEvent.description}
      <p class="mb-3 text-sm text-slate-700 line-clamp-3">{hoveredEvent.description}</p>
    {/if}
    <div class="flex flex-wrap gap-2">
      <a
        href={getGoogleCalendarUrl(hoveredEvent)}
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
        onclick={() => hoveredEvent && downloadEventICS(hoveredEvent)}
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
