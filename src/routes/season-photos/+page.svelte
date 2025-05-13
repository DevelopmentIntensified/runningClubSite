<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let selectedSeason = data.seasons[0];
</script>

<svelte:head>
  <title>Season Photos - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Season Photos</h2>
      </div>
      <div class="p-6 sm:p-8">
        <div class="mb-6">
          <label for="season" class="block text-sm font-medium text-gray-700">Select Season</label>
          <select
            id="season"
            bind:value={selectedSeason}
            class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          >
            {#each data.seasons as season}
              <option value={season}>{season}</option>
            {/each}
          </select>
        </div>

        <div class="space-y-4">
          {#each data.linksBySeason[selectedSeason] as link}
            <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h3 class="text-lg font-medium text-gray-900">{link.title}</h3>
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                class="mt-2 inline-flex items-center text-primary-600 hover:text-primary-900"
              >
                View Photos
                <svg
                  class="ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                  />
                  <path
                    d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                  />
                </svg>
              </a>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div> 