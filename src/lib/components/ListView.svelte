<script lang="ts">
  import { DateTime } from 'luxon';
  import type { Writable } from 'svelte/store';
  import type { CalendarEventView } from '$lib/types';

  export let currentDate: Writable<any>;
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
            <p class="text-sm text-slate-700">{event.description}</p>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>
