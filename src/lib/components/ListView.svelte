<script lang="ts">
  import type { Event } from '$lib/types';
  import { parseDate } from '$lib/utils/dateUtils';
  import type { Writable } from 'svelte/store';

  export let currentDate: Writable<Date>;
  export let events: Event[];
  export let removeEvent: (id: string) => void;

  $: year = $currentDate.getFullYear();
  $: month = $currentDate.getMonth();

  $: filteredEvents = events
    .filter((event) => {
      const eventDate = event.date;
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
</script>

<div class="space-y-4">
  {#if filteredEvents.length === 0}
    <div
      class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <div class="mb-2 w-full items-center justify-between text-center font-bold">
        There are no events this month.
      </div>
    </div>
  {/if}
  {#each filteredEvents as event}
    <a href="/schedule/event/{event.id}" class="block">
      <div
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="mb-2 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{event.title}</h3>
          <!-- <button -->
          <!--   class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" -->
          <!--   on:click={() => removeEvent(event.id)} -->
          <!-- > -->
          <!--   <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> -->
          <!-- </button> -->
        </div>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
        <p class="mb-2 text-gray-700 dark:text-gray-300">{event.description}</p>
        {#if event.type.includes('Indoor')}
          <span class="rounded bg-orange-300 p-1">Indoor Race</span>
        {:else if !event.type.includes('Social')}
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
      </div>
    </a>
  {/each}
</div>
