<script lang="ts">
  import { enhance } from '$app/forms';

  let name = '';
  let imageUrl = '';
  let graduationYear = new Date().getFullYear();
  let major = '';
  let achievements = '';
  let currentOccupation = '';
  let error = '';
  let success = '';

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch('/api/alumni', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      success = 'Alumni added successfully';
      name = '';
      imageUrl = '';
      graduationYear = new Date().getFullYear();
      major = '';
      achievements = '';
      currentOccupation = '';
    } else {
      const data = await response.json();
      error = data.message;
    }
  }
</script>

<svelte:head>
  <title>Add Alumni - Admin - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Add Alumni</h1>

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
      <label for="graduationYear" class="block text-gray-700 text-sm font-bold mb-2">Graduation Year</label>
      <input type="number" id="graduationYear" name="graduationYear" bind:value={graduationYear} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="major" class="block text-gray-700 text-sm font-bold mb-2">Major</label>
      <input type="text" id="major" name="major" bind:value={major} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="achievements" class="block text-gray-700 text-sm font-bold mb-2">Achievements</label>
      <textarea id="achievements" name="achievements" bind:value={achievements} required rows="3"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
    </div>
    <div class="mb-6">
      <label for="currentOccupation" class="block text-gray-700 text-sm font-bold mb-2">Current Occupation</label>
      <input type="text" id="currentOccupation" name="currentOccupation" bind:value={currentOccupation} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>

    {#if error}
      <div class="text-red-500 text-sm mb-4">{error}</div>
    {/if}

    {#if success}
      <div class="text-green-500 text-sm mb-4">{success}</div>
    {/if}

    <div class="flex items-center justify-between">
      <button type="submit" class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Alumni
      </button>
    </div>
  </form>
</div>

