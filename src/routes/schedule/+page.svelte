<script lang="ts">
	export let data;
	console.warn('DEBUGPRINT[1]: +page.svelte:9: data=', data);

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
	<h1 class="mb-8 text-center text-4xl font-bold">Club Schedule</h1>

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
