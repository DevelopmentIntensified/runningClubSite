<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { events } from '$lib/events';

  export let data;

  let event = {
    id: '',
    title: '',
    start: '',
    end: '',
    location: '',
    type: 'social'
  };

  let isNewEvent = true;
  let error = '';

  onMount(() => {
    if (data.id) {
      const existingEvent = events.find(e => e.id === data.id);
      if (existingEvent) {
        event = {
          ...existingEvent,
          start: formatDateForInput(existingEvent.start),
          end: formatDateForInput(existingEvent.end)
        };
        isNewEvent = false;
      }
    }
  });

  function formatDateForInput(date: Date): string {
    return date.toISOString().slice(0, 16);
  }

  function handleSubmit() {
    if (!event.title || !event.start || !event.end || !event.location) {
      error = 'Please fill in all required fields.';
      return;
    }

    const updatedEvent = {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    };

    if (isNewEvent) {
      events.push(updatedEvent);
    } else {
      const index = events.findIndex(e => e.id === event.id);
      if (index !== -1) {
        events[index] = updatedEvent;
      }
    }

    // In a real application, you would save this to a database here

    goto('/admin/events');
  }
</script>

<svelte:head>
  <title>{isNewEvent ? 'Create' : 'Edit'} Event - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-3xl mx-auto">
    <div class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-primary-600 py-6 px-4 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">
          {isNewEvent ? 'Create New Event' : 'Edit Event'}
        </h2>
      </div>
      <div class="p-6 sm:p-8">
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" bind:value={event.title} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="start" class="block text-sm font-medium text-gray-700">Start Date and Time</label>
            <input type="datetime-local" id="start" bind:value={event.start} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="end" class="block text-sm font-medium text-gray-700">End Date and Time</label>
            <input type="datetime-local" id="end" bind:value={event.end} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" id="location" bind:value={event.location} required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          </div>
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">Event Type</label>
            <select id="type" bind:value={event.type}
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
              <option value="social">Social</option>
              <option value="training">Training</option>
              <option value="race">Race</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>
          {#if error}
            <div class="text-red-500 text-sm">{error}</div>
          {/if}
          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {isNewEvent ? 'Create Event' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

