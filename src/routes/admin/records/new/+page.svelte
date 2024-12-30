<script lang="ts">
  import { enhance } from '$app/forms';

  let error = '';
</script>

<svelte:head>
  <title>Add New Record - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Add New Record</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/createRecord" method="POST" use:enhance class="space-y-6">
          <div>
            <label for="event" class="block text-sm font-medium text-gray-700">Event</label>
            <input
              type="text"
              id="event"
              name="event"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              name="type"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="track">Track</option>
              <option value="cross_country">Cross Country</option>
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
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
