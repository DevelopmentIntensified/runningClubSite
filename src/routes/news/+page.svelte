<script lang="ts">
  import { DateTime } from 'luxon';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>News - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">Latest News</h1>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each data.news as newsItem}
      <a
        href="/news/{newsItem.id}"
        class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
      >
        {#if newsItem.imageUrl}
          <div class="h-52 w-full flex-shrink-0 overflow-hidden bg-slate-100">
            <img
              src={newsItem.imageUrl}
              alt={newsItem.title}
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        {/if}
        <div class="p-6">
          <h2 class="mb-2 text-xl font-semibold text-gray-900 group-hover:text-primary-600">
            {newsItem.title}
          </h2>
          <p class="mb-4 text-sm text-gray-500">
            {DateTime.fromJSDate(new Date(newsItem.createdAt)).toLocaleString(DateTime.DATE_MED)}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
