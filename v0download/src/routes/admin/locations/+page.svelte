<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  let name = '';
  let description = '';
  let latitude = '';
  let longitude = '';
  let error = '';
  let success = '';
  let locations = [];

  onMount(async () => {
    const response = await fetch('/api/locations');
    locations = await response.json();
  });

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch('/api/locations', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      success = 'Location added successfully';
      name = '';
      description = '';
      latitude = '';
      longitude = '';
      const newLocation = await response.json();
      locations = [...locations, newLocation];
    } else {
      const data = await response.json();
      error = data.message;
    }
  }

  async function deleteLocation(id: number) {
    const response = await fetch(`/api/locations/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      locations = locations.filter(location => location.id !== id);
    } else {
      error = 'Failed to delete location';
    }
  }
</script>

<svelte:head>
  <title>Manage Locations - Admin - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Manage Locations</h1>

  <form on:submit|preventDefault={handleSubmit} use:enhance class="max-w-lg mx-auto mb-12">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <input type="text" id="name" name="name" bind:value={name} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <textarea id="description" name="description" bind:value={description} rows="3"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
    </div>
    <div class="mb-4">
      <label for="latitude" class="block text-gray-700 text-sm font-bold mb-2">Latitude</label>
      <input type="number" id="latitude" name="latitude" bind:value={latitude} required step="any"
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-6">
      <label for="longitude" class="block text-gray-700 text-sm font-bold mb-2">Longitude</label>
      <input type="number" id="longitude" name="longitude" bind:value={longitude} required step="any"
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
        Add Location
      </button>
    </div>
  </form>

  <h2 class="text-2xl font-bold mb-4">Existing Locations</h2>
  <div class="space-y-4">
    {#each locations as location}
      <div class="bg-white shadow rounded-lg p-4 flex justify-between items-center">
        <div>
          <h3 class="font-bold">{location.name}</h3>
          <p class="text-sm text-gray-600">{location.description}</p>
          <p class="text-xs text-gray-500">Lat: {location.latitude}, Long: {location.longitude}</p>
        </div>
        <button on:click={() => deleteLocation(location.id)} class="text-red-600 hover:text-red-800">
          Delete
        </button>
      </div>
    {/each}
  </div>
</div>

