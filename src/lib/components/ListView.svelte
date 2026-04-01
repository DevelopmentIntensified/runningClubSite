<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidate } from '$app/navigation';
  import { DateTime } from 'luxon';
  import type { Writable } from 'svelte/store';

  export let currentDate: Writable<DateTime>;
  export let isAdmin = false;

  type EventItem = {
    id: number;
    start: DateTime;
    end: DateTime;
    date: DateTime;
    title: string;
    location: string;
    type: string;
    description: string;
  };

  export let events: EventItem[];

  $: year = $currentDate.year;
  $: month = $currentDate.month;

  $: filteredEvents = events
    .filter((event) => {
      const eventDate = event.date;
      return eventDate.year === year && eventDate.month === month;
    })
    .sort((a, b) => a.date.toUnixInteger() - b.date.toUnixInteger());

  function getEventColor(type: string): string {
    if (type.includes('Indoor')) return 'bg-orange-300';
    if (type.includes('NIRCA')) return 'bg-red-300';
    if (type.includes('NCAA')) return 'bg-blue-300';
    if (type.includes('Social')) return 'bg-purple-300';
    if (type.includes('Trail Race')) return 'bg-green-300';
    if (type.includes('Road Race')) return 'bg-teal-300';
    if (type.includes('Practice')) return 'bg-yellow-300';
    return 'bg-yellow-300';
  }
</script>

<div class="space-y-4">
  {#if filteredEvents.length === 0}
    <div class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="mb-2 w-full items-center justify-between text-center font-bold">
        There are no events this month.
      </div>
    </div>
  {/if}
  {#each filteredEvents as event}
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {#if isAdmin}
        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">{event.title}</h3>
          <div class="flex items-center gap-2">
            <a
              href="/admin/events/edit/{event.id}"
              class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Edit
            </a>
            <form
              action="/admin/events?/deleteEvent"
              method="POST"
              class="inline"
              use:enhance={() => {
                return async ({ result }) => {
                  if (result.type === 'success') {
                    await invalidate('/admin/events');
                  }
                };
              }}
            >
              <input type="hidden" name="id" value={event.id} />
              <button
                type="submit"
                class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      {:else}
        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">{event.title}</h3>
        </div>
      {/if}
      <p class="mb-2 text-sm text-gray-600">
        {event.date.setZone('America/New_York').toLocaleString(DateTime.DATETIME_SHORT)}
      </p>
      <p class="mb-2 text-sm text-gray-600">{event.location}</p>
      <p class="mb-2 text-gray-700">{event.description}</p>
      <div class="flex flex-wrap gap-2">
        {#if event.type.includes('Indoor')}
          <span class="rounded bg-orange-300 p-1 text-sm">Indoor Race</span>
        {:else if event.type.includes('Practice')}
          <span class="rounded bg-yellow-300 p-1 text-sm">Practice</span>
        {:else if !event.type.includes('Social')}
          <span class="rounded bg-yellow-300 p-1 text-sm">Outdoor Race</span>
        {/if}
        {#if event.type.includes('NIRCA')}
          <span class="rounded bg-red-300 p-1 text-sm">{event.type}</span>
        {/if}
        {#if event.type.includes('NCAA')}
          <span class="rounded bg-blue-300 p-1 text-sm">{event.type}</span>
        {/if}
        {#if event.type.includes('Social')}
          <span class="rounded bg-purple-300 p-1 text-sm">{event.type}</span>
        {/if}
        {#if event.type.includes('Trail Race')}
          <span class="rounded bg-green-300 p-1 text-sm">{event.type}</span>
        {/if}
        {#if event.type.includes('Road Race')}
          <span class="rounded bg-teal-300 p-1 text-sm">{event.type}</span>
        {/if}
      </div>
    </div>
  {/each}
</div>
