<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import { DateTime } from 'luxon';
  import { typeOptions } from '$lib/events';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let { locations } = data;

  let error = '';

  let startDate = $state('');
  let endDate = $state('');

  // Location combobox state. selectedLocationId is the numeric id or 'custom'.
  let selectedLocationId = $state('');
  let customLocation = $state('');
  let selectedLoc = $state<{ id: number; name: string } | null>(null);
  // Effective location name submitted to the server.
  let locationName = $derived(
    selectedLocationId === 'custom' ? customLocation : (selectedLoc?.name ?? '')
  );
  let locationIdValue = $derived(
    selectedLocationId !== 'custom' && selectedLocationId ? String(selectedLocationId) : ''
  );

  function onLocationChange() {
    if (selectedLocationId === 'custom') {
      selectedLoc = null;
      return;
    }
    const found = locations.find((l) => String(l.id) === String(selectedLocationId));
    selectedLoc = found ?? null;
    if (found) selectedLocationId = String(found.id);
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    if (dateParam) {
      const dateObj = DateTime.fromFormat(dateParam, 'yyyy-MM-dd', { zone: 'America/New_York' });
      if (dateObj.isValid) {
        startDate = dateObj.toFormat('yyyy-MM-dd') + 'T09:00';
        endDate = dateObj.toFormat('yyyy-MM-dd') + 'T10:00';
      }
    }
  });
</script>

<svelte:head>
  <title>Create New Event - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto w-full max-w-2xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Create New Event</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/createEvent" method="POST" use:enhance class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              class="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div>
            <label for="start" class="block text-sm font-medium text-gray-700"
              >Start Date and Time</label
            >
            <input
              type="datetime-local"
              id="start"
              name="start"
              bind:value={startDate}
              required
              class="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div>
            <label for="end" class="block text-sm font-medium text-gray-700"
              >End Date and Time</label
            >
            <input
              type="datetime-local"
              id="end"
              name="end"
              bind:value={endDate}
              required
              class="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <select
              id="location"
              bind:value={selectedLocationId}
              onchange={onLocationChange}
              class="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
            >
              <option value="" disabled>Select a location…</option>
              {#each locations as loc}
                <option value={String(loc.id)}
                  >{loc.name}{loc.description ? ` — ${loc.description}` : ''}</option
                >
              {/each}
              <option value="custom">Other / Custom location…</option>
            </select>
            {#if selectedLocationId === 'custom'}
              <input
                type="text"
                id="location-custom"
                placeholder="Enter a custom location"
                bind:value={customLocation}
                class="focus:border-primary-500 focus:ring-primary-500 mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
              />
            {/if}
            <input type="hidden" name="locationId" value={locationIdValue} />
            <input type="hidden" name="location" value={locationName} />
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700"
              >description</label
            >
            <input
              type="text"
              id="description"
              name="description"
              required
              class="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">Event Type</label>
            <select
              id="type"
              name="type"
              class="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none sm:text-sm"
            >
              {#each typeOptions() as opt}
                <option value={opt.value}>{opt.label}</option>
              {/each}
            </select>
          </div>
          {#if error}
            <div class="text-sm text-red-500">{error}</div>
          {/if}
          <div>
            <button
              type="submit"
              class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Create Event
            </button>
          </div>
          <input
            type="hidden"
            class="m-0 hidden h-0 p-0"
            name="offset"
            value={new Date().getTimezoneOffset() / 60}
          />
        </form>
      </div>
    </div>
  </div>
</div>
