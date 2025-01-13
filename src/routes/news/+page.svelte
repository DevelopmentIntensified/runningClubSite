<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>News - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">Latest News</h1>

  <div class="space-y-8">
    {#each data.news as newsItem}
      <div class="overflow-hidden rounded-lg bg-white shadow-md">
        <div class="p-6">
          <h2 class="mb-2 text-2xl font-semibold">{newsItem.title}</h2>
          <p class="mb-4 text-gray-500">{new Date(newsItem.createdAt).toLocaleDateString()}</p>
          <div class="prose max-w-none">
            {@html newsItem.content}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
