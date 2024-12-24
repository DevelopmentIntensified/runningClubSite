<script lang="ts">
	import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '$lib/utils/dateUtils';
	import type { Event } from '$lib/types';
	import type { Writable } from 'svelte/store';

	export let currentDate: Writable<Date>;
	export let events: Event[];
	export let removeEvent: (id: string) => void;

	$: year = $currentDate.getFullYear();
	$: month = $currentDate.getMonth();
	$: daysInMonth = getDaysInMonth(year, month);
	$: firstDayOfMonth = getFirstDayOfMonth(year, month);

	$: days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
	$: emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
</script>

<div class="grid grid-cols-7 gap-1 sm:gap-2">
	{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
		<div
			class="p-1 text-center text-sm font-semibold text-gray-600 sm:p-2 sm:text-base dark:text-gray-400"
		>
			{day}
		</div>
	{/each}
	{#each emptyDays as _}
		<div class="p-1 sm:p-2"></div>
	{/each}
	{#each days as day}
		{@const date = formatDate(new Date(year, month, day))}
		{@const dayEvents = events.filter((event) => formatDate(event.date) === date)}
		<div
			class="min-h-[80px] rounded-md border border-gray-200 p-1 sm:min-h-[100px] sm:p-2 dark:border-gray-700"
		>
			<div class="font-medium text-gray-700 dark:text-gray-300">{day}</div>
			<div class="space-y-1">
				{#each dayEvents as event}
					<a href="/schedule/event/{event.id}" class="block">
						<div
							class="flex items-center justify-between rounded bg-blue-100 p-1 text-xs text-blue-800 sm:text-sm dark:bg-blue-900 dark:text-blue-200"
						>
							<span class="truncate">{event.title}</span>
							<!-- <button -->
							<!--   class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" -->
							<!--   on:click={() => removeEvent(event.id)} -->
							<!-- > -->
							<!--   <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> -->
							<!-- </button> -->
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
