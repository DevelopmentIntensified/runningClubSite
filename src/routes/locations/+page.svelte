<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  let searchQuery = '';
  let copiedId: number | null = null;
  
  $: filteredLocations = searchQuery
    ? data.locations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data.locations;

  async function copyLink(id: number, link: string) {
    try {
      await navigator.clipboard.writeText(link);
      copiedId = id;
      setTimeout(() => copiedId = null, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<svelte:head>
  <title>Running Locations - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <div class="relative h-48 sm:h-64 md:h-80">
    <img
      src={data.image.imageUrl}
      alt={data.image.alt}
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60">
      <div class="px-4 text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">     
          Running Locations
        </h2>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-8">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative flex-1 max-w-md">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search locations..."
          class="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 shadow-sm transition-shadow focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div class="text-sm text-gray-600">
        {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} available
      </div>
    </div>

    {#if filteredLocations.length === 0}
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <svg class="h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No locations found</h3>
        <p class="mt-1 text-gray-500">Try adjusting your search query</p>
      </div>
    {:else}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each filteredLocations as location}
          <div class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div class="flex flex-1 flex-col p-6">
              <h3 class="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {location.name}
              </h3>
              <p class="mb-4 flex-1 text-gray-600">
                {#if location.description}
                  {@html location.description}
                {:else}
                  No description available.
                {/if}
              </p>
              <div class="mt-auto flex gap-3">
                <button
                  on:click={() => copyLink(location.id, location.link)}
                  class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {#if copiedId === location.id}
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  {:else}
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy Link
                  {/if}
                </button>
                <a
                  href={location.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
