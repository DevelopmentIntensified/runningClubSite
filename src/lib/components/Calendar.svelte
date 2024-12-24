<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import MonthView from './MonthView.svelte';
  import ListView from './ListView.svelte';
  import DateSelector from './DateSelector.svelte';
	import type { CalendarEvent } from '$lib/server/db/schema';

  export let currentDate: Writable<Date>;
  export let events: CalendarEvent[];

  let view: 'month' | 'list' = 'month';

  function removeEvent(id: string) {
    events = events.filter(event => event.id !== id);
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
  <div class="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
    <DateSelector {currentDate} />
    <div class="flex space-x-2">
      <button
        class="px-4 py-2 rounded-md {view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}"
        on:click={() => view = 'month'}
      >
        Month View
      </button>
      <button
        class="px-4 py-2 rounded-md {view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}"
        on:click={() => view = 'list'}
      >
        List View
      </button>
    </div>
  </div>
  {#if view === 'month'}
    <MonthView {currentDate} {events} {removeEvent} />
  {:else}
    <ListView {currentDate} {events} {removeEvent} />
  {/if}
</div>

