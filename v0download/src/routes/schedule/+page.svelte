<script lang="ts">
  import { onMount } from 'svelte';
  import Calendar from 'svelte-calendar';
  import { format } from 'date-fns';

  export let data;

  let events = data.events;
  let selectedDate = new Date();

  function getDayEvents(date: Date) {
    return events.filter(event => 
      format(new Date(event.start), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  }

  let dayEvents = getDayEvents(selectedDate);

  function handleDateSelect(event: CustomEvent) {
    selectedDate = event.detail.date;
    dayEvents = getDayEvents(selectedDate);
  }
</script>

<svelte:head>
  <title>Schedule - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Club Schedule</h1>

  <div class="grid md:grid-cols-2 gap-8">
    <div>
      <Calendar
        selected={selectedDate}
        on:select={handleDateSelect}
        events={events.map(event => ({
          date: new Date(event.start),
          className: 'bg-primary-500 text-white rounded-full'
        }))}
      />
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Events on {format(selectedDate, 'MMMM d, yyyy')}</h2>
      {#if dayEvents.length > 0}
        <ul class="space-y-4">
          {#each dayEvents as event}
            <li class="bg-white shadow rounded-lg p-4">
              <h3 class="font-bold">{event.title}</h3>
              <p class="text-sm text-gray-600">
                {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
              </p>
              {#if event.location}
                <p class="text-sm text-gray-600">Location: {event.location}</p>
              {/if}
              {#if event.description}
                <p class="mt-2">{event.description}</p>
              {/if}
            </li>
          {/each}
        </ul>
      {:else}
        <p>No events scheduled for this day.</p>
      {/if}
    </div>
  </div>
</div>

