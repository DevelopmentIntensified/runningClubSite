<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { PageData } from './$types';
  import womensImg from '$lib/assets/images/nirca/boysgolrcgirls.jpeg';
  import mensImg from '$lib/assets/images/nirca/girlsgolrcboys.jpeg';

  export let data: PageData;

  let activeSection = 'men';
  let activeType = 'cross_country';

  $: menRecords = data.records.filter((record) => record.gender === 'male');
  $: womenRecords = data.records.filter((record) => record.gender === 'female');

  $: filteredMenRecords = menRecords.filter((record) => record.type === activeType);
  $: filteredWomenRecords = womenRecords.filter((record) => record.type === activeType);

  function setActiveType(type: string) {
    activeType = type;
  }

  function setActiveSection(section: string) {
    activeSection = section;
  }
</script>

<svelte:head>
  <title>Club Records - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">Club Records</h1>

  <div class="mb-8 flex justify-center space-x-4">
    <button
      class="rounded-full px-4 py-2 {activeSection === 'men'
        ? 'bg-primary-600 text-white'
        : 'bg-gray-200 text-gray-800'}"
      on:click={() => setActiveSection('men')}
    >
      Men's Records
    </button>
    <button
      class="rounded-full px-4 py-2 {activeSection === 'women'
        ? 'bg-primary-600 text-white'
        : 'bg-gray-200 text-gray-800'}"
      on:click={() => setActiveSection('women')}
    >
      Women's Records
    </button>
  </div>

  {#if activeSection === 'men'}
    <div transition:slide>
      <div class="relative mb-8">
        <img
          src={mensImg}
          alt="Go LRC Boys"
          class="h-96 w-full rounded-lg object-cover shadow-lg"
        />
        <h2 class="shadow-text absolute bottom-4 left-4 text-3xl font-bold text-white">
          Men's Records
        </h2>
      </div>

      <div class="mb-8 flex justify-center space-x-4">
        <button
          class="rounded-full px-4 py-2 {activeType === 'cross_country'
            ? 'bg-secondary-600 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => setActiveType('cross_country')}
        >
          Cross Country
        </button>
        <button
          class="rounded-full px-4 py-2 {activeType === 'track'
            ? 'bg-secondary-600 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => setActiveType('track')}
        >
          Track
        </button>
        <button
          class="rounded-full px-4 py-2 {activeType === 'field'
            ? 'bg-secondary-600 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => setActiveType('field')}
        >
          Field
        </button>
      </div>

      <div class="overflow-hidden rounded-lg bg-white shadow-lg">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Event</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Time/Mark</th>
              <th class="px-4 py-2 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredMenRecords as record}
              <tr class="border-b">
                <td class="px-4 py-2">{record.event}</td>
                <td class="px-4 py-2">
                  {#if record.link}
                    <a
                      href={record.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary-600 hover:underline">{record.name}</a
                    >
                  {:else}
                    {record.name}
                  {/if}
                </td>
                <td class="px-4 py-2">{record.time}</td>
                <td class="px-4 py-2">{record.year || 'N/A'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div transition:slide>
      <div class="relative mb-8">
        <img
          src={womensImg}
          alt="Women's Team"
          class="h-96 w-full rounded-lg object-cover shadow-lg"
        />
        <h2 class="shadow-text absolute bottom-4 left-4 text-3xl font-bold text-white">
          Women's Records
        </h2>
      </div>

      <div class="mb-8 flex justify-center space-x-4">
        <button
          class="rounded-full px-4 py-2 {activeType === 'cross_country'
            ? 'bg-secondary-600 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => setActiveType('cross_country')}
        >
          Cross Country
        </button>
        <button
          class="rounded-full px-4 py-2 {activeType === 'track'
            ? 'bg-secondary-600 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => setActiveType('track')}
        >
          Track
        </button>
        <button
          class="rounded-full px-4 py-2 {activeType === 'field'
            ? 'bg-secondary-600 text-white'
            : 'bg-gray-200 text-gray-800'}"
          on:click={() => setActiveType('field')}
        >
          Field
        </button>
      </div>

      <div class="overflow-hidden rounded-lg bg-white shadow-lg">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-left">Event</th>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Time/Mark</th>
              <th class="px-4 py-2 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredWomenRecords as record}
              <tr class="border-b">
                <td class="px-4 py-2">{record.event}</td>
                <td class="px-4 py-2">
                  {#if record.link}
                    <a
                      href={record.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary-600 hover:underline">{record.name}</a
                    >
                  {:else}
                    {record.name}
                  {/if}
                </td>
                <td class="px-4 py-2">{record.time}</td>
                <td class="px-4 py-2">{record.year || 'N/A'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>

<style>
  .shadow-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>
