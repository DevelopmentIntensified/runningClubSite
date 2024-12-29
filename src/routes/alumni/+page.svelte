<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Alumni - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Our Alumni</h1>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.alumni as alumnus}
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        {#if alumnus.imageUrl}
          <img src={alumnus.imageUrl} alt={alumnus.name} class="w-full h-48 object-cover" />
        {:else}
          <div class="w-full h-48 bg-gray-300 flex items-center justify-center">
            <span class="text-gray-500 text-2xl">No Image</span>
          </div>
        {/if}
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">{alumnus.name}</h2>
          <p class="text-gray-600 mb-2">Class of {alumnus.graduationYear}</p>
          {#if alumnus.currentOccupation}
            <p class="text-gray-600 mb-2">Current: {alumnus.currentOccupation}</p>
          {/if}
          {#if alumnus.achievements}
            <p class="text-gray-600">{alumnus.achievements}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

