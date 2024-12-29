<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  $: trackRecords = data.records.filter(record => record.type === 'track');
  $: crossCountryRecords = data.records.filter(record => record.type === 'cross_country');

  $: maleTrackRecords = trackRecords.filter(record => record.gender === 'male');
  $: femaleTrackRecords = trackRecords.filter(record => record.gender === 'female');
  $: maleCrossCountryRecords = crossCountryRecords.filter(record => record.gender === 'male');
  $: femaleCrossCountryRecords = crossCountryRecords.filter(record => record.gender === 'female');
</script>

<svelte:head>
  <title>Club Records - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Club Records</h1>

  <div class="mb-12">
    <h2 class="text-3xl font-semibold mb-4">Cross Country Records</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-2xl font-semibold mb-2">Male</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Distance</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each maleCrossCountryRecords as record}
              <tr>
                <td>{record.event}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-2">Female</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Distance</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each femaleCrossCountryRecords as record}
              <tr>
                <td>{record.event}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div>
    <h2 class="text-3xl font-semibold mb-4">Track Records</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-2xl font-semibold mb-2">Male</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Event</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each maleTrackRecords as record}
              <tr>
                <td>{record.event}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-2">Female</h3>
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left">Event</th>
              <th class="text-left">Name</th>
              <th class="text-left">Time</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {#each femaleTrackRecords as record}
              <tr>
                <td>{record.event}</td>
                <td>{record.name}</td>
                <td>{record.time}</td>
                <td>{record.year}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

