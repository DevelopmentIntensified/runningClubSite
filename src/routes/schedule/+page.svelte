<script lang="ts">
  import logo from '$lib/assets/images/logos/redLogo.png';
  export let data;
  // console.warn('DEBUGPRINT[1]: +page.svelte:9: data=', data);

  import { writable } from 'svelte/store';
  import Calendar from '$lib/components/Calendar.svelte';
  import type { CalendarEvent } from '$lib/server/db/schema.js';

  const currentDate = writable(new Date());
  const events: CalendarEvent[] = data.events;
</script>

<svelte:head>
  <title>Schedule - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="overflow-hidden rounded-lg bg-white shadow-xl">
    <div class="relative h-64 sm:h-80 md:h-96">
      <img src={logo} alt="Runners training" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <h2 class="px-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Club Schdule
        </h2>
      </div>
    </div>
    <Calendar {currentDate} {events} />
    <!-- <div class="mt-8"> -->
    <!-- 	<h2 class="mb-4 text-2xl font-semibold">Upcoming Events</h2> -->
    <!-- 	<ul class="space-y-4"> -->
    <!-- 		{#each data.events as event} -->
    <!-- 			<li class="rounded-lg bg-white p-4 shadow"> -->
    <!-- 				<h3 class="font-bold">{event.title}</h3> -->
    <!-- 				<p class="text-sm text-gray-600"> -->
    <!-- 					{format(new Date(event.start), 'PPpp')} - {format(new Date(event.end), 'PPpp')} -->
    <!-- 				</p> -->
    <!-- 				{#if event.location} -->
    <!-- 					<p class="text-sm text-gray-600">Location: {event.location}</p> -->
    <!-- 				{/if} -->
    <!-- 				{#if event.description} -->
    <!-- 					<p class="mt-2 mb-1">{event.description}</p> -->
    <!-- 				{/if} -->
    <!-- 				{#if event.type.includes('Indoor')} -->
    <!-- 					<span class="rounded bg-orange-300 p-1">Indoor Race</span> -->
    <!-- 				{:else} -->
    <!-- 					<span class="rounded bg-yellow-300 p-1">Outdoor Race</span> -->
    <!-- 				{/if} -->
    <!-- 				{#if event.type.includes('NIRCA')} -->
    <!-- 					<span class="rounded bg-red-300 p-1">{event.type}</span> -->
    <!-- 				{/if} -->
    <!-- 				{#if event.type.includes('NCAA')} -->
    <!-- 					<span class="rounded bg-blue-300 p-1">{event.type}</span> -->
    <!-- 				{/if} -->
    <!-- 				{#if event.type.includes('Trail Race')} -->
    <!-- 					<span class="rounded bg-green-300 p-1">{event.type}</span> -->
    <!-- 				{/if} -->
    <!-- 			</li> -->
    <!-- 		{/each} -->
    <!-- 	</ul> -->
    <!-- </div> -->
  </div>
</div>
