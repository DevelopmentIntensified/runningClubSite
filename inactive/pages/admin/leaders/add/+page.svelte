<script lang="ts">
  import { enhance } from '$app/forms';

  let name = '';
  let imageUrl = '';
  let position = '';
  let description = '';
  let error = '';
  let success = '';

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch('/api/leaders', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      success = 'Leader added successfully';
      name = '';
      imageUrl = '';
      position = '';
      description = '';
    } else {
      const data = await response.json();
      error = data.message;
    }
  }
</script>

<svelte:head>
  <title>Add Leader - Admin - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Add Leader</h1>

  <form on:submit|preventDefault={handleSubmit} use:enhance class="max-w-lg mx-auto">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <input type="text" id="name" name="name" bind:value={name} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="imageUrl" class="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
      <input type="url" id="imageUrl" name="imageUrl" bind:value={imageUrl} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="position" class="block text-gray-700 text-sm font-bold mb-2">Position</label>
      <input type="text" id="position" name="position" bind:value={position} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-6">
      <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <textarea id="description" name="description" bind:value={description} required rows="4"
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
        Add Leader
      </button>
    </div>
  </form>
</div>

