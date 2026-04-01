<script lang="ts">
  import type { DateTime } from 'luxon';
  import type { Writable } from 'svelte/store';

  export let currentDate: Writable<DateTime>;

  function prevMonth() {
    currentDate.update((date) => date.plus({ month: -1 }));
  }

  function nextMonth() {
    currentDate.update((date) => date.plus({ month: 1 }));
  }
</script>

<div class="flex items-center justify-center gap-3 sm:justify-start">
  <button
    type="button"
    class="rounded-lg bg-white p-2 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
    on:click={prevMonth}
    aria-label="Previous month"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><polyline points="15 18 9 12 15 6"></polyline></svg
    >
  </button>
  <h2 class="min-w-[10rem] text-center text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
    {$currentDate.toFormat('MMMM yyyy')}
  </h2>
  <button
    type="button"
    class="rounded-lg bg-white p-2 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
    on:click={nextMonth}
    aria-label="Next month"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><polyline points="9 18 15 12 9 6"></polyline></svg
    >
  </button>
</div>
