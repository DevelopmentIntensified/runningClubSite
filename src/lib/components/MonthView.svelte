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
  let hoveredEventElement: HTMLElement | null = null;

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

  function handleEventHover(event: CalendarEventView, element: HTMLElement) {
    hoveredEvent = event;
    hoveredEventElement = element;
  }

  function handleEventLeave() {
    hoveredEvent = null;
    hoveredEventElement = null;
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
      {@const date = DateTime.fromObject({ year, month, day }, { zone: 'America/New_York' })}
      {@const dayEvents = events.filter((event) => {
        const eventStart = event.start.startOf('day');
        const eventEnd = event.end.startOf('day');
        if (isAdmin) {
          return date >= eventStart && date <= eventEnd;
        } else {
          return date.hasSame(eventStart, 'day');
        }
      })}
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
              <a
                href={isAdmin ? `/admin/events/edit/${event.id}` : `/schedule/event/${event.id}`}
                class="min-w-0 flex-1"
              >
                <div
                  onmouseenter={(e) => handleEventHover(event, e.currentTarget as HTMLElement)}
                  onmouseleave={handleEventLeave}
                  class="truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 sm:text-xs cursor-pointer hover:opacity-80 {chipClass(
                    event.type
                  )}"
                >
                  {event.title}
                </div>
              </a>
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

{#if hoveredEvent && hoveredEventElement}
  {@const rect = hoveredEventElement.getBoundingClientRect()}
  <div
    class="fixed z-50 rounded-lg border border-slate-200 bg-white p-4 shadow-xl"
    style="left: {rect.left}px; top: {rect.bottom + 8}px; min-width: {Math.max(rect.width, 200)}px;"
    onmouseenter={() => hoveredEvent = hoveredEvent}
    onmouseleave={handleEventLeave}
    role="tooltip"
  >
    <a
      href={isAdmin ? `/admin/events/edit/${hoveredEvent.id}` : `/schedule/event/${hoveredEvent.id}`}
      class="block"
    >
      <h4 class="mb-2 font-semibold text-slate-900 hover:text-primary-600">{hoveredEvent.title}</h4>
    </a>
    <p class="mb-1 text-sm text-slate-600">
      {#if hoveredEvent.start.hasSame(hoveredEvent.end, 'day')}
        {hoveredEvent.start.toLocaleString(DateTime.DATETIME_FULL)}
      {:else}
        {hoveredEvent.start.toLocaleString(DateTime.DATE_FULL)} - {hoveredEvent.end.toLocaleString(DateTime.DATE_FULL)}
      {/if}
    </p>
    {#if hoveredEvent.location}
      <p class="mb-2 text-sm text-slate-600">{hoveredEvent.location}</p>
    {/if}
    {#if hoveredEvent.description}
      <p class="text-sm text-slate-700">{hoveredEvent.description}</p>
    {/if}
  </div>
{/if}
