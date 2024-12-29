<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  let { record } = data;
  let error = '';
</script>

<svelte:head>
  <title>Edit Record - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-primary-600 py-6 px-4 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">
          Edit Record
        </h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/updateRecord" method="POST" use:enhance class="space-y-6">
          <div>
            <label for="event" class="block text-sm font-medium text-gray-700">Event</label>
            <input type="text" id="event" name="event" value={record.event} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={record.name} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
            <input type="text" id="time" name="time" value={record.time} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
            <input type="number" id="year" name="year" value={record.year} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
            <select id="gender" name="gender" value={record.gender} required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
            <select id="type" name="type" value={record.type} required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
              <option value="track">Track</option>
              <option value="cross_country">Cross Country</option>
            </select>
          </div>
          {#if error}
            <div class="text-red-500 text-sm">{error}</div>
          {/if}
          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Update Record
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

