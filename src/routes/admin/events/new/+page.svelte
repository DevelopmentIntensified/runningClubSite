<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import { DateTime } from 'luxon';
  import { typeOptions } from '$lib/events';

  let error = '';

  let startDate = $state('');
  let endDate = $state('');

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
  <div class="mx-auto max-w-3xl">
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
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
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
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">Event Type</label>
            <select
              id="type"
              name="type"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
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
              class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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
