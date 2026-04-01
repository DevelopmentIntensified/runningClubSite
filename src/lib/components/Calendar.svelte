<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import MonthView from './MonthView.svelte';
  import ListView from './ListView.svelte';
  import DateSelector from './DateSelector.svelte';
  import type { CalendarEventView } from '$lib/types';
  import type { DateTime } from 'luxon';

  export let currentDate: Writable<DateTime>;
  export let events: CalendarEventView[];
  export let isAdmin = false;

  let view: 'month' | 'list' = 'month';
</script>

<div class="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-4 shadow-sm sm:p-6">
  <div class="mb-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
    <DateSelector {currentDate} />
    <div class="flex justify-center gap-2 sm:justify-end">
      <button
        type="button"
        class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {view === 'month'
          ? 'bg-primary-600 text-white shadow-sm'
          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'}"
        on:click={() => (view = 'month')}
      >
        Month
      </button>
      <button
        type="button"
        class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {view === 'list'
          ? 'bg-primary-600 text-white shadow-sm'
          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'}"
        on:click={() => (view = 'list')}
      >
        List
      </button>
    </div>
  </div>
  {#if view === 'month'}
    <MonthView {currentDate} {events} {isAdmin} />
  {:else}
    <ListView {currentDate} {events} {isAdmin} />
  {/if}
</div>
