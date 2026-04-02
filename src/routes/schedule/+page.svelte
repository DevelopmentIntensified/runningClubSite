<script lang="ts">
  import { writable } from 'svelte/store';
  import Calendar from '$lib/components/Calendar.svelte';
  import type { CalendarEventView } from '$lib/types';
  import { DateTime } from 'luxon';
  import type { PageData } from './$types';

  export let data: PageData;

  type ScheduleEventRow = {
    id: number;
    title: string;
    type: string;
    description: string | null;
    location: string | null;
    created_at: Date;
    date: Date;
    start: string | Date;
    end: string | Date;
  };

  const currentDate = writable(DateTime.now().setZone('America/New_York'));

  let events: CalendarEventView[] = (data.events as ScheduleEventRow[]).map((e) => ({
    ...e,
    date: DateTime.fromJSDate(e.date instanceof Date ? e.date : new Date(e.date)),
    start: DateTime.fromJSDate(new Date(e.start)),
    end: DateTime.fromJSDate(new Date(e.end))
  }));
</script>

<svelte:head>
  <title>Schedule - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="relative mb-8 h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80">
    <img
      src={data.image.imageUrl}
      alt={data.image.alt}
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60">
      <div class="px-4 text-center">
        <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Schedule</h1>
        <p class="mt-2 text-sm text-white/90 sm:text-base">Weekly and season events in calendar view.</p>
      </div>
    </div>
  </div>

  <Calendar {currentDate} {events} />
</div>
