<script lang="ts">
  import type { PageData } from './$types';

  import trainingImg from '$lib/assets/images/training/runnerstapracticeunderlights.png';
  export let data: PageData;
</script>

<svelte:head>
  <title>Running Locations - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="overflow-hidden rounded-lg bg-white shadow-xl">
    <div class="relative h-64 sm:h-80 md:h-96">
      <img
        src={trainingImg}
        alt="Runners training"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h2 class="px-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Running Locations
        </h2>
      </div>
    </div>

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
</div>
