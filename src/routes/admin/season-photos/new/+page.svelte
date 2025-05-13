<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
  let error = '';

  const seasons = [
    'Fall 2020',
    'Spring 2021',
    'Fall 2021',
    'Spring 2022',
    'Fall 2022',
    'Spring 2023',
    'Fall 2023',
    'Spring 2024',
    'Fall 2024',
    'Spring 2025',
    'Fall 2025',
    'Spring 2026',
    'Fall 2026',
    'Spring 2027',
    'Fall 2027',
  ];
</script>

<svelte:head>
  <title>Add New Season Photo Album - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Add New Season Photo Album</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/createLink" method="POST" use:enhance class="space-y-6">
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
            <label for="season" class="block text-sm font-medium text-gray-700">Season</label>
            <select
              id="season"
              name="season"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Select a season</option>
              {#each seasons as season}
                <option value={season}>{season}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="link" class="block text-sm font-medium text-gray-700">Photo Album Link</label>
            <input
              type="url"
              id="link"
              name="link"
              required
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          {#if error}
            <div class="text-sm text-red-500">{error}</div>
          {/if}
          <div class="flex justify-end">
            <button
              type="submit"
              class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add Photo Album
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div> 
