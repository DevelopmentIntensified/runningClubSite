<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Manage Events - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-primary-600 py-6 px-4 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">
          Manage Events
        </h2>
      </div>
      <div class="p-6 sm:p-8">
        <div class="mb-6">
          <a href="/admin/events/new" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Create New Event
          </a>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each data.events as event (event.id)}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.start).toLocaleString()}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(event.end).toLocaleString()}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.type}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="/admin/events/{event.id}/edit" class="text-primary-600 hover:text-primary-900 mr-4">Edit</a>
                    <form action="?/deleteEvent" method="POST" use:enhance class="inline">
                      <input type="hidden" name="id" value={event.id}>
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

