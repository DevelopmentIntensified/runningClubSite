<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidate } from '$app/navigation';
  import { DateTime } from 'luxon';
  import { writable } from 'svelte/store';
  import Calendar from '$lib/components/Calendar.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const currentDate = writable(DateTime.now().setZone('America/New_York'));
  let events = data.events.map((e: any) => ({
    ...e,
    date: DateTime.fromJSDate(e.date),
    start: DateTime.fromJSDate(e.start),
    end: DateTime.fromJSDate(e.end)
  }));

  $: events = data.events.map((e: any) => ({
    ...e,
    date: DateTime.fromJSDate(e.date),
    start: DateTime.fromJSDate(e.start),
    end: DateTime.fromJSDate(e.end)
  }));
</script>

<svelte:head>
  <title>Manage Events - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Manage Events</h2>
      </div>
      <div class="p-6 sm:p-8">
        <Calendar {currentDate} {events} isAdmin={data.isAdmin} />
      </div>
    </div>
  </div>
</div>
