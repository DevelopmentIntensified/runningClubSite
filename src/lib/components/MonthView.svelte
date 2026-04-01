<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidate } from '$app/navigation';
  import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '$lib/utils/dateUtils';
  import type { Writable } from 'svelte/store';
  import { DateTime } from 'luxon';

  export let currentDate: Writable<DateTime>;
  export let isAdmin = false;

  type EventItem = {
    id: number;
    title: string;
    type: string;
    date?: DateTime;
    start?: DateTime;
    end?: DateTime;
  };

  export let events: EventItem[];

  $: year = $currentDate.year;
  $: month = $currentDate.month;
  $: daysInMonth = getDaysInMonth(year, month) ?? 30;
  $: firstDayOfMonth = (getFirstDayOfMonth(year, month) ?? 0) % 7;

  $: days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  $: emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const colors: Record<string, string> = {
    NIRCA: 'bg-red-200',
    NCAA: 'bg-blue-200',
    Social: 'bg-purple-200',
    Trail: 'bg-green-200',
    Road: 'bg-teal-200',
    Practice: 'bg-yellow-200'
  };

  function getEventColor(type: string): string {
    for (const key of Object.keys(colors)) {
      if (type.includes(key)) return colors[key];
    }
    return 'bg-blue-200';
  }
</script>

<div class="mb-4">
  <span class="rounded bg-yellow-200 p-1 text-xs">Practice</span>
  <span class="rounded bg-red-200 p-1 text-xs">NIRCA Meet</span>
  <span class="rounded bg-blue-200 p-1 text-xs">NCAA Meet</span>
  <span class="rounded bg-purple-200 p-1 text-xs">Social Event</span>
  <span class="rounded bg-green-200 p-1 text-xs">Trail Race</span>
  <span class="rounded bg-teal-200 p-1 text-xs">Road Race</span>
</div>
<div class="grid grid-cols-7 gap-1 sm:gap-2">
  {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
    <div class="p-1 text-center text-sm font-semibold text-gray-600 sm:p-2 sm:text-base">
      {day}
    </div>
  {/each}
  {#each emptyDays as _}
    <div class="p-1 sm:p-2"></div>
  {/each}
  {#each days as day}
    {@const date = formatDate(
      DateTime.fromObject({ year, month, day: day }, { zone: 'America/New_York' })
    )}
    {@const dayEvents = events.filter((event) => {
      if (!event.date) return false;
      return formatDate(event.date) === date;
    })}
    <div
      class="min-h-[80px] rounded-md border border-gray-200 p-1 sm:min-h-[100px] sm:p-2 {isAdmin
        ? 'cursor-pointer hover:bg-gray-50'
        : ''}"
    >
      {#if isAdmin}
        <a href="/admin/events/new?date={date}" class="block">
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700">{day}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-400 hover:text-primary-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-label="Add event"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </a>
      {:else}
        <div class="font-medium text-gray-700">{day}</div>
      {/if}
      <div class="space-y-1">
        {#each dayEvents as event}
          <div class="group relative">
            {#if isAdmin}
              <div
                class="flex items-center justify-between rounded {getEventColor(
                  event.type
                )} p-1 text-xs sm:text-sm"
              >
                <a href="/admin/events/edit/{event.id}" class="flex-1 truncate">{event.title}</a>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <a
                    href="/admin/events/edit/{event.id}"
                    class="text-gray-600 hover:text-blue-600"
                    aria-label="Edit event"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 sm:h-4 sm:w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
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
                      class="text-gray-600 hover:text-red-600"
                      aria-label="Delete event"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3 sm:h-4 sm:w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            {:else}
              <a href="/schedule/event/{event.id}" class="block">
                <div class="rounded {getEventColor(event.type)} p-1 text-xs sm:text-sm">
                  <span class="truncate">{event.title}</span>
                </div>
              </a>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
