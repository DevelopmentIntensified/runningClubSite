<script lang="ts">
  import { goto } from '$app/navigation';
  import { DateTime } from 'luxon';

  export let data;
  // In a real application, you would fetch the event data from an API
  // For this example, we'll use mock data
  const event = data.event;
  function goBack() {
    goto('/schedule');
  }
</script>

<div class="container mx-auto p-4">
  <button on:click={goBack} class="mb-4 flex items-center text-blue-500 hover:text-blue-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-1 h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg
    >
    Back to Calendar
  </button>
  <div class="rounded-lg bg-white p-6 shadow-lg ">
    <h1 class="mb-4 text-3xl font-bold text-gray-800 ">{event.title}</h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <p class="text-gray-600 "><strong>Date:</strong> {DateTime.fromJSDate(event.date).setZone('America/New_York').toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
        <p class="text-gray-600 ">
          <strong>Time:</strong>
          {DateTime.fromJSDate(event.start).setZone('America/New_York').toLocaleString(DateTime.TIME_SIMPLE)} - {DateTime.fromJSDate(event.end).setZone('America/New_York').toLocaleString(DateTime.TIME_SIMPLE)}
        </p>
        <p class="text-gray-600 "><strong>Location:</strong> {event.location}</p>
        <p class="text-gray-600 "><strong>Type:</strong> {event.type}</p>
      </div>
      <div>
        <h2 class="mb-2 text-xl font-semibold text-gray-800 ">Description</h2>
        <p class="mb-2 text-gray-700 ">{event.description}</p>
        {#if event.type.includes('Indoor')}
          <span class="rounded bg-orange-300 p-1">Indoor Race</span>
        {:else if !event.type.includes('Social') && !event.type.includes('Practice')}
          <span class="rounded bg-yellow-300 p-1">Outdoor Race</span>
        {/if}
        {#if event.type.includes('NIRCA')}
          <span class="rounded bg-red-300 p-1">{event.type}</span>
        {/if}
        {#if event.type.includes('NCAA')}
          <span class="rounded bg-blue-300 p-1">{event.type}</span>
        {/if}
        {#if event.type.includes('Social')}
          <span class="rounded bg-purple-300 p-1">{event.type}</span>
        {/if}
        {#if event.type.includes('Trail Race')}
          <span class="rounded bg-green-300 p-1">{event.type}</span>
        {/if}
      </div>
    </div>
  </div>
</div>
