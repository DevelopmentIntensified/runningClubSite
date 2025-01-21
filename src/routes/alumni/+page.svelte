<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Alumni - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">Our Alumni</h1>
  <h3 class="text-center text-xl">
    Are you one of our alumni? Don't see yourself here? Feel free to <a class="text-blue-600" href="/contact">Contact us</a> and ask us to add you. You should also join our
  <a href="https://alumnicommunity.liberty.edu/groups/92/feed" class="text-blue-600">Alumni Group</a>. We look forward to seeing you there!
  </h3>

  <div class="grid gap-8 mt-3 md:grid-cols-2 lg:grid-cols-3">
    {#each data.alumni as alumnus}
      <div class="overflow-hidden rounded-lg bg-white shadow-lg">
        {#if alumnus.imageUrl}
          <img src={alumnus.imageUrl} alt={alumnus.name} class="h-96 w-full object-cover" />
        {:else}
          <div class="flex h-48 w-full items-center justify-center bg-gray-300">
            <span class="text-2xl text-gray-500">No Image</span>
          </div>
        {/if}
        <div class="p-6">
          <h2 class="mb-2 text-xl font-semibold">{alumnus.name}</h2>
          <p class="mb-2 text-gray-600">Class of {alumnus.graduationYear}</p>
          {#if alumnus.currentOccupation}
            <p class="mb-2 text-gray-600">Current: {alumnus.currentOccupation}</p>
          {/if}
          {#if alumnus.achievements}
            <p class="text-gray-600">{alumnus.achievements}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
