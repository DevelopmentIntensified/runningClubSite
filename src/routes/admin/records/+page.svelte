<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  $: trackRecords = data.records.filter(record => record.type === 'track');
  $: crossCountryRecords = data.records.filter(record => record.type === 'cross_country');
</script>

<svelte:head>
  <title>Manage Records - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-primary-600 py-6 px-4 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">
          Manage Records
        </h2>
      </div>
      <div class="p-6 sm:p-8">
        <div class="mb-6">
          <a href="/admin/records/new" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Add New Record
          </a>
        </div>
        
        <h3 class="text-2xl font-bold mb-4">Track Records</h3>
        <div class="overflow-x-auto mb-8">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each trackRecords as record (record.id)}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.event}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.time}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.year}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.gender}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="/admin/records/{record.id}/edit" class="text-primary-600 hover:text-primary-900 mr-4">Edit</a>
                    <form action="?/deleteRecord" method="POST" use:enhance class="inline">
                      <input type="hidden" name="id" value={record.id}>
                      <button type="submit" class="text-red-600 hover:text-red-900">Delete</button>
                    </form>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <h3 class="text-2xl font-bold mb-4">Cross Country Records</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each crossCountryRecords as record (record.id)}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.event}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.time}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.year}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.gender}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="/admin/records/{record.id}/edit" class="text-primary-600 hover:text-primary-900 mr-4">Edit</a>
                    <form action="?/deleteRecord" method="POST" use:enhance class="inline">
                      <input type="hidden" name="id" value={record.id}>
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

