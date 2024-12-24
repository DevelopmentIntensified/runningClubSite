<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>News - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Latest News</h1>

  <div class="space-y-8">
    {#each data.news as item}
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">{item.title}</h2>
          <p class="text-gray-600 mb-4">{item.content}</p>
          <p class="text-sm text-gray-500">Posted on {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

