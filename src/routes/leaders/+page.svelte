<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Club Leaders - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">Club Leaders</h1>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.leaders as leader}
      <div class="overflow-hidden rounded-lg bg-white shadow-lg">
        {#if leader.imageUrl}
          <img src={leader.imageUrl} alt={leader.name} class="h-48 w-full object-cover" />
        {:else}
          <div class="flex h-48 w-full items-center justify-center bg-gray-300">
            <span class="text-2xl text-gray-500">No Image</span>
          </div>
        {/if}
        <div class="p-6">
          <h2 class="mb-2 text-xl font-semibold">{leader.name}</h2>
          <p class="mb-4 text-gray-600">{leader.position}</p>
          {#if leader.bio}
            <p class="text-gray-600">{leader.bio}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
