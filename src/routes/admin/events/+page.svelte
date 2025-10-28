<script lang="ts">
  import { enhance } from '$app/forms';
  import { DateTime } from 'luxon';
  import type { PageData } from './$types';

  export let data: PageData;

  let searchTerm = '';

  $: filteredEvents = data.events
    .filter((event) => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
        <div class="mb-6 flex justify-between items-center">
          <input
            type="text"
            name="search"
            id="search"
            bind:value={searchTerm}
            placeholder="Search by title, location, or description"
            class="mt-1 block w-96 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
          <a
            href="/admin/events/new"
            class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Add New Event
          </a>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >Title</th
                >
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >Date</th
                >
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >Location</th
                >
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >Actions</th
                >
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              {#each filteredEvents as event (event.id)}
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                    >{event.title}</td
                  >
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >{new Date(event.date).toLocaleDateString()}</td
                  >
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >{event.location}</td
                  >
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <a
                      href="/admin/events/{event.id}/edit"
                      class="mr-4 text-primary-600 hover:text-primary-900">Edit</a
                    >
                    <form action="?/deleteEvent" method="POST" use:enhance class="inline">
                      <input type="hidden" name="id" value={event.id} />
                      <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                    </form>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
