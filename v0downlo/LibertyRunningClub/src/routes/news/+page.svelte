<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>News - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Latest News</h1>

  <div class="space-y-8">
    {#each data.news as newsItem}
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">{newsItem.title}</h2>
          <p class="text-gray-500 mb-4">{new Date(newsItem.createdAt).toLocaleDateString()}</p>
          <div class="prose max-w-none">
            {@html newsItem.content}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

