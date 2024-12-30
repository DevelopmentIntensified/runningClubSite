<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Running Locations - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">Running Locations</h1>

  <div class="space-y-12">
    {#each data.locations as location}
      <div class="overflow-hidden rounded-lg bg-white shadow-md">
        <div class="p-6">
          <a href={location.link} class="mb-2 text-2xl font-semibold text-blue-800"
            >{location.name}</a
          >
          <p class="mb-4 text-gray-600">{location.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
