<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Club Leaders - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Club Leaders</h1>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.leaders as leader}
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        {#if leader.imageUrl}
          <img src={leader.imageUrl} alt={leader.name} class="w-full h-48 object-cover" />
        {:else}
          <div class="w-full h-48 bg-gray-300 flex items-center justify-center">
            <span class="text-gray-500 text-2xl">No Image</span>
          </div>
        {/if}
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">{leader.name}</h2>
          <p class="text-gray-600 mb-4">{leader.position}</p>
          {#if leader.bio}
            <p class="text-gray-600">{leader.bio}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

