<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import MonthView from './MonthView.svelte';
  import ListView from './ListView.svelte';
  import DateSelector from './DateSelector.svelte';
  import type { DateTime } from 'luxon';

  export let currentDate: Writable<DateTime>;
  export let isAdmin = false;

  type CalendarEventItem = {
    id: number;
    title: string;
    type: string;
    date: DateTime;
    start: DateTime;
    end: DateTime;
    location?: string;
    description?: string;
  };

  export let events: CalendarEventItem[] = [];

  let view: 'month' | 'list' = 'month';
</script>

<div class="mb-8 bg-white p-4 sm:p-6">
  <div class="mb-4 flex flex-col items-center gap-3 sm:mb-6 sm:flex-row sm:justify-between">
    <DateSelector {currentDate} />
    <div class="flex items-center gap-2 sm:gap-4">
      {#if isAdmin}
        <a
          href="/admin/events/new"
          class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:px-4 sm:py-2"
        >
          New Event
        </a>
      {/if}
      <div class="flex space-x-2">
        <button
          class="rounded-md px-3 py-1.5 text-sm sm:px-4 sm:py-2 {view === 'month'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => (view = 'month')}
        >
          Month
        </button>
        <button
          class="rounded-md px-3 py-1.5 text-sm sm:px-4 sm:py-2 {view === 'list'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => (view = 'list')}
        >
          List
        </button>
      </div>
    </div>
  </div>
  {#if view === 'month'}
    <MonthView {currentDate} {events} {isAdmin} />
  {:else}
    <ListView {currentDate} {events} {isAdmin} />
  {/if}
</div>
