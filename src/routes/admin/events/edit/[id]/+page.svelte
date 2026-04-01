<script lang="ts">
  import { enhance } from '$app/forms';
  import { DateTime } from 'luxon';
  import type { PageData } from './$types';

  export let data: PageData;

  let { event } = data;
  let error = '';

  function formatDateForInput(date: string): string {

    return DateTime.fromISO(date.replace(" ", "T")).setZone('America/New_York').toString().slice(0, 16);
  }
</script>

<svelte:head>
  <title>Edit Event - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Edit Event</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/updateEvent" method="POST" use:enhance class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={event.title}
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
              value={formatDateForInput(event.start)}
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
              value={formatDateForInput(event.end)}
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
              value={event.location}
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">Event Type</label>
            <select
              id="type"
              name="type"
              value={event.type}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="Social">Social</option>
              <option value="Practice">Practice</option>
              <option value="Trail Race">Trail Race</option>
              <option value="NIRCA Outdoor Race">NIRCA Outdoor Race</option>
              <option value="NIRCA Indoor Race">NIRCA Indoor Race</option>
              <option value="NCAA Outdoor Race">NCAA Outdoor Race</option>
              <option value="NCAA Indoor Race">NCAA Indoor Race</option>
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
              Update Event
            </button>
          </div>
          <input type="hidden" class="hidden h-0 m-0 p-0" name="offset" value={new Date().getTimezoneOffset()/60} />
        </form>
      </div>
    </div>
  </div>
</div>
