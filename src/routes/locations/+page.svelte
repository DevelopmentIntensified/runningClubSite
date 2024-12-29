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
          <a href={location.link} class="text-2xl text-blue-800 font-semibold mb-2">{location.name}</a>
          <p class="text-gray-600 mb-4">{location.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>


