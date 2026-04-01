<script lang="ts">
  import { DateTime } from 'luxon';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>News - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">Latest News</h1>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.news as newsItem}
      <a
        href="/news/{newsItem.id}"
        class="group block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
      >
        {#if newsItem.imageUrl}
          <div class="aspect-w-16 aspect-h-9">
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title}
              class="h-full w-full object-cover max-h-96 max-w-[500px]"
            />
          </div>
        {/if}
        <div class="p-6">
          <h2 class="mb-2 text-xl font-semibold text-gray-900 group-hover:text-primary-600">
            {newsItem.title}
          </h2>
          <p class="mb-4 text-sm text-gray-500">
            {DateTime.fromJSDate(newsItem.createdAt).toLocaleString(DateTime.DATE_MED)}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
