<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Running Locations - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Running Locations</h1>

  <div class="space-y-12">
    {#each data.locations as location}
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">{location.name}</h2>
          <p class="text-gray-600 mb-4">{location.description}</p>
        </div>
        <div class="aspect-w-16 aspect-h-9">
          <iframe
            src={location.mapUrl}
            width="600"
            height="450"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            title={`Map of ${location.name}`}
          ></iframe>
        </div>
      </div>
    {/each}
  </div>
</div>

