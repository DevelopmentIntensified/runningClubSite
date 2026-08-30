<script lang="ts">
  import { DateTime } from 'luxon';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>News - Liberty Running Club</title>
  <meta
    name="description"
    content="Latest news and updates from the Liberty University Running Club."
  />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-4xl">Latest News</h1>

  {#if data.news.length}
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
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          {/if}
          <div class="p-6">
            <h2 class="group-hover:text-primary-600 mb-2 text-xl font-semibold text-gray-900">
              {newsItem.title}
            </h2>
            <p class="mb-4 text-sm text-gray-500">
              {DateTime.fromJSDate(new Date(newsItem.createdAt)).toLocaleString(DateTime.DATE_MED)}
            </p>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-slate-900">No news yet</h3>
      <p class="mt-1 text-slate-500">Check back soon for the latest club updates</p>
    </div>
  {/if}
</div>
