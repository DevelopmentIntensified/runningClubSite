<script lang="ts">
  import { enhance } from '$app/forms';
  import { writable } from 'svelte/store';
  import Calendar from '$lib/components/Calendar.svelte';
  import type { PageData } from './$types';
  import { DateTime } from 'luxon';
  import type { CalendarEventView } from '$lib/types';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');

  let events: CalendarEventView[] = $derived(
    data.events.map((e) => ({
      ...e,
      date: DateTime.fromJSDate(new Date(e.date)),
      start: DateTime.fromJSDate(new Date(e.start)),
      end: DateTime.fromJSDate(new Date(e.end))
    }))
  );

  const currentDate = writable(DateTime.now().setZone('America/New_York'));

  let filteredEvents = $derived.by(() => {
    let result = [...data.events];
    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });
</script>

<svelte:head>
  <title>Manage Events - Liberty Running Club</title>
</svelte:head>

<div class="p-4 sm:p-6 lg:p-8">
  <div class="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
      <h2 class="text-xl font-semibold text-slate-800">Calendar</h2>
      <p class="mt-1 text-sm text-slate-500">
        Click an event to edit. Hover to reveal delete button.
      </p>
    </div>
    <div class="p-4 sm:p-6">
      <Calendar {currentDate} {events} isAdmin />
    </div>
  </div>

  <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="relative max-w-md flex-1">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search by title, location, or description"
        class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      />
      <svg
        class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <a
      href="/admin/events/new"
      class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add Event
    </a>
  </div>

  {#if filteredEvents.length === 0}
    <div
      class="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 text-center"
    >
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No events found</p>
    </div>
  {:else}
    <div class="overflow-x-auto rounded-xl border border-slate-200">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >Title</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >Date</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >Location</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
              >Actions</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredEvents as event (event.id)}
            <tr class="transition-colors hover:bg-slate-50/50">
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700"
                >{event.title}</td
              >
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600"
                >{new Date(event.date).toLocaleDateString()}</td
              >
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{event.location}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm">
                <div class="flex items-center gap-3">
                  <a
                    href="/admin/events/edit/{event.id}"
                    class="text-xs font-medium text-primary-600 hover:text-primary-800">Edit</a
                  >
                  <span class="text-slate-300">|</span>
                  <form action="?/deleteEvent" method="POST" use:enhance class="inline">
                    <input type="hidden" name="id" value={event.id} />
                    <button type="submit" class="text-xs text-red-600 hover:text-red-800"
                      >Delete</button
                    >
                  </form>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
