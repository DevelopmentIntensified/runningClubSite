<script lang="ts">
  import { enhance } from '$app/forms';
  import { writable } from 'svelte/store';
  import Calendar from '$lib/components/Calendar.svelte';
  import type { PageData } from './$types';
  import { DateTime } from 'luxon';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');
  
  let events = $derived(data.events.map(e => ({
    ...e,
    date: DateTime.fromJSDate(new Date(e.date)),
    start: DateTime.fromJSDate(new Date(e.start)),
    end: DateTime.fromJSDate(new Date(e.end)),
  })));

  const currentDate = writable(DateTime.now().setZone('America/New_York'));

  let filteredEvents = $derived.by(() => {
    let result = [...data.events];
    if (searchTerm) {
      result = result.filter(event => 
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

<div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-8">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Calendar View</h2>
    </div>
  </div>
  <Calendar {currentDate} {events} />
</div>

<div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Events List</h2>
      
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search by title, location, or description"
            class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-80"
          />
          <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
    </div>
  </div>

  {#if filteredEvents.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No events found</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Title</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Location</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredEvents as event (event.id)}
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">{event.title}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{new Date(event.date).toLocaleDateString()}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{event.location}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm">
                <div class="flex items-center gap-3">
                  <a href="/admin/events/{event.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                  <span class="text-slate-300">|</span>
                  <form action="?/deleteEvent" method="POST" use:enhance class="inline">
                    <input type="hidden" name="id" value={event.id} />
                    <button type="submit" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
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