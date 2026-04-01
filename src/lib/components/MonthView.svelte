<script lang="ts">
  import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '$lib/utils/dateUtils';
  import type { CalendarEventView } from '$lib/types';
  import type { Writable } from 'svelte/store';
  import { DateTime } from 'luxon';

  export let currentDate: Writable<DateTime>;
  export let events: CalendarEventView[];
  export let isAdmin = false;

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
    Road: 'bg-amber-100 text-amber-900 ring-amber-200/80',
    Practice: 'bg-yellow-100 text-yellow-900 ring-yellow-200/80'
  };

  function chipClass(type: string): string {
    const key = Object.keys(colors).find((k) => type.includes(k));
    return colors[key ?? ''] ?? 'bg-slate-100 text-slate-800 ring-slate-200/80';
  }
</script>

<div class="mb-6 flex flex-wrap gap-2 text-xs sm:text-sm">
  <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-1 font-medium text-yellow-900 ring-1 ring-yellow-200/80">Practice</span>
  <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 font-medium text-red-900 ring-1 ring-red-200/80">NIRCA</span>
  <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 font-medium text-blue-900 ring-1 ring-blue-200/80">NCAA</span>
  <span class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-1 font-medium text-purple-900 ring-1 ring-purple-200/80">Social</span>
  <span class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-900 ring-1 ring-emerald-200/80">Trail Race</span>
  <span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 font-medium text-amber-900 ring-1 ring-amber-200/80">Road Race</span>
</div>

<div class="overflow-x-auto rounded-xl ring-1 ring-slate-200/80">
  <div class="grid min-w-[320px] grid-cols-7 gap-px bg-slate-200">
    {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
      <div class="bg-slate-100 px-1 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-2 sm:text-sm">
        {day}
      </div>
    {/each}
    {#each emptyDays as _}
      <div class="min-h-[5.5rem] bg-slate-50/80 sm:min-h-[6.5rem]"></div>
    {/each}
    {#each days as day}
      {@const date = formatDate(DateTime.fromObject({ year, month, day }, { zone: 'America/New_York' }))}
      {@const dayEvents = events.filter((event) => formatDate(event.date) === date)}
      <div
        class="min-h-[5.5rem] border-t border-transparent bg-white p-1.5 transition-colors hover:bg-slate-50/90 sm:min-h-[6.5rem] sm:p-2"
      >
        <div class="mb-1 text-xs font-semibold text-slate-500 sm:text-sm">{day}</div>
        <div class="flex flex-col gap-1">
          {#each dayEvents as event}
            <a
              href={isAdmin ? `/admin/events/edit/${event.id}` : `/schedule/event/${event.id}`}
              class="block min-w-0"
            >
              <div
                class="truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 sm:text-xs {chipClass(
                  event.type
                )}"
              >
                {event.title}
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
