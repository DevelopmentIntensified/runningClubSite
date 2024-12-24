<script lang="ts">
  import { enhance } from '$app/forms';

  let title = '';
  let content = '';
  let error = '';
  let success = '';

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch('/api/news', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      success = 'News item added successfully';
      title = '';
      content = '';
    } else {
      const data = await response.json();
      error = data.message;
    }
  }
</script>

<svelte:head>
  <title>Add News - Admin - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Add News</h1>

  <form on:submit|preventDefault={handleSubmit} use:enhance class="max-w-lg mx-auto">
    <div class="mb-4">
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
      <input type="text" id="title" name="title" bind:value={title} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-6">
      <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
      <textarea id="content" name="content" bind:value={content} required rows="5"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
    </div>

    {#if error}
      <div class="text-red-500 text-sm mb-4">{error}</div>
    {/if}

    {#if success}
      <div class="text-green-500 text-sm mb-4">{success}</div>
    {/if}

    <div class="flex items-center justify-between">
      <button type="submit" class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add News
      </button>
    </div>
  </form>
</div>

