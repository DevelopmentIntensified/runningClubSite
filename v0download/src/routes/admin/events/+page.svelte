<script lang="ts">
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';

  let title = '';
  let start = '';
  let end = '';
  let description = '';
  let location = '';
  let error = '';
  let success = '';
  let events = [];

  onMount(async () => {
    const response = await fetch('/api/events');
    events = await response.json();
  });

  async function handleSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const response = await fetch('/api/events', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      success = 'Event added successfully';
      title = '';
      start = '';
      end = '';
      description = '';
      location = '';
      const newEvent = await response.json();
      events = [...events, newEvent];
    } else {
      const data = await response.json();
      error = data.message;
    }
  }

  async function deleteEvent(id: number) {
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      events = events.filter(event => event.id !== id);
    } else {
      error = 'Failed to delete event';
    }
  }
</script>

<svelte:head>
  <title>Manage Events - Admin - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Manage Events</h1>

  <form on:submit|preventDefault={handleSubmit} use:enhance class="max-w-lg mx-auto mb-12">
    <div class="mb-4">
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
      <input type="text" id="title" name="title" bind:value={title} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="start" class="block text-gray-700 text-sm font-bold mb-2">Start Date and Time</label>
      <input type="datetime-local" id="start" name="start" bind:value={start} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="end" class="block text-gray-700 text-sm font-bold mb-2">End Date and Time</label>
      <input type="datetime-local" id="end" name="end" bind:value={end} required
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500">
    </div>
    <div class="mb-4">
      <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <textarea id="description" name="description" bind:value={description} rows="3"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
    </div>
    <div class="mb-6">
      <label for="location" class="block text-gray-700 text-sm font-bold mb-2">Location</label>
      <input type="text" id="location" name="location" bind:value={location}
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
        Add Event
      </button>
    </div>
  </form>

  <h2 class="text-2xl font-bold mb-4">Existing Events</h2>
  <div class="space-y-4">
    {#each events as event}
      <div class="bg-white shadow rounded-lg p-4 flex justify-between items-center">
        <div>
          <h3 class="font-bold">{event.title}</h3>
          <p class="text-sm text-gray-600">{new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}</p>
        </div>
        <button on:click={() => deleteEvent(event.id)} class="text-red-600 hover:text-red-800">
          Delete
        </button>
      </div>
    {/each}
  </div>
</div>

