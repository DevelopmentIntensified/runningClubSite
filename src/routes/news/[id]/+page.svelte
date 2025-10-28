<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.newsItem.title} - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <article class="mx-auto max-w-3xl">
    {#if data.newsItem.imageUrl}
      <img
        src={data.newsItem.imageUrl}
        alt={data.newsItem.title}
        class="mb-8 w-full rounded-lg object-cover shadow-lg"
      />
    {/if}
    
    <h1 class="mb-4 text-4xl font-bold">{data.newsItem.title}</h1>
    <p class="mb-8 text-gray-500">{new Date(data.newsItem.createdAt).toLocaleDateString()}</p>
    
    <div class="prose prose-lg max-w-none">
      {@html data.newsItem.content}
    </div>
  </article>
</div> 