<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let currentDate: Writable<Date>;

  function prevMonth() {
    currentDate.update((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  }

  function nextMonth() {
    currentDate.update((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  }
</script>

<div class="flex items-center space-x-4">
  <button
    class="rounded-full bg-gray-200 p-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    on:click={prevMonth}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg
    >
  </button>
  <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
    {$currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
  </h2>
  <button
    class="rounded-full bg-gray-200 p-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    on:click={nextMonth}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg
    >
  </button>
</div>
