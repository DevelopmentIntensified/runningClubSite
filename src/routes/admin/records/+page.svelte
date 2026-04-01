<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');

  let trackRecords = $derived.by(() => {
    let result = data.records.filter(r => r.type === 'track' || r.type === 'field');
    if (searchTerm) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.year?.toString() ?? '').includes(searchTerm)
      );
    }
    return result;
  });

  let roadRecords = $derived.by(() => {
    let result = data.records.filter(r => r.type === 'road');
    if (searchTerm) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.year?.toString() ?? '').includes(searchTerm)
      );
    }
    return result;
  });

  let crossCountryRecords = $derived.by(() => {
    let result = data.records.filter(r => r.type === 'cross_country');
    if (searchTerm) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.year?.toString() ?? '').includes(searchTerm)
      );
    }
    return result;
  });

  let trailRecords = $derived.by(() => {
    let result = data.records.filter(r => r.type === 'trail');
    if (searchTerm) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.year?.toString() ?? '').includes(searchTerm)
      );
    }
    return result;
  });
</script>

<svelte:head>
  <title>Manage Records - Liberty Running Club</title>
</svelte:head>

<div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Records</h2>
      
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search by name, event, time, or year"
            class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-80"
          />
          <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <a
          href="/admin/records/new"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Record
        </a>
      </div>
    </div>
  </div>

  <div class="p-6">
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-slate-800 mb-4">Track Records</h3>
      {#if trackRecords.length === 0}
        <div class="flex flex-col items-center justify-center py-8 text-center">
          <p class="text-sm text-slate-500">No track records found</p>
        </div>
      {:else}
        <div class="overflow-x-auto rounded-lg border border-slate-200">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50/50">
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Event</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Time</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Year</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Gender</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {#each trackRecords as record (record.id)}
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.event}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.name}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.time}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.year ?? '-'}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.gender}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm">
                    <div class="flex items-center gap-2">
                      <a href="/admin/records/{record.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                      <span class="text-slate-300">|</span>
                      <form action="?/deleteRecord" method="POST" use:enhance class="inline">
                        <input type="hidden" name="id" value={record.id} />
                        <button type="submit" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>

    <div>
      <h3 class="text-lg font-semibold text-slate-800 mb-4">Cross Country Records</h3>
      {#if crossCountryRecords.length === 0}
        <div class="flex flex-col items-center justify-center py-8 text-center">
          <p class="text-sm text-slate-500">No cross country records found</p>
        </div>
      {:else}
        <div class="overflow-x-auto rounded-lg border border-slate-200">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50/50">
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Event</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Time</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Year</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Gender</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {#each crossCountryRecords as record (record.id)}
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.event}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.name}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.time}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.year ?? '-'}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.gender}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm">
                    <div class="flex items-center gap-2">
                      <a href="/admin/records/{record.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                      <span class="text-slate-300">|</span>
                      <form action="?/deleteRecord" method="POST" use:enhance class="inline">
                        <input type="hidden" name="id" value={record.id} />
                        <button type="submit" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>

    <div class="mb-8">
      <h3 class="text-lg font-semibold text-slate-800 mb-4">Trail Records</h3>
      {#if trailRecords.length === 0}
        <div class="flex flex-col items-center justify-center py-8 text-center">
          <p class="text-sm text-slate-500">No trail records found</p>
        </div>
      {:else}
        <div class="overflow-x-auto rounded-lg border border-slate-200">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50/50">
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Event</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Time</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Year</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Gender</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {#each trailRecords as record (record.id)}
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.event}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.name}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.time}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.year ?? '-'}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.gender}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm">
                    <div class="flex items-center gap-2">
                      <a href="/admin/records/{record.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                      <span class="text-slate-300">|</span>
                      <form action="?/deleteRecord" method="POST" use:enhance class="inline">
                        <input type="hidden" name="id" value={record.id} />
                        <button type="submit" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>

    <div>
      <h3 class="text-lg font-semibold text-slate-800 mb-4">Road Records</h3>
      {#if roadRecords.length === 0}
        <div class="flex flex-col items-center justify-center py-8 text-center">
          <p class="text-sm text-slate-500">No road records found</p>
        </div>
      {:else}
        <div class="overflow-x-auto rounded-lg border border-slate-200">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50/50">
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Event</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Time</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Year</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Gender</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {#each roadRecords as record (record.id)}
                <tr class="hover:bg-slate-50/50 transition-colors">
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.event}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.name}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.time}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.year ?? '-'}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{record.gender}</td>
                  <td class="whitespace-nowrap px-4 py-3 text-sm">
                    <div class="flex items-center gap-2">
                      <a href="/admin/records/{record.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                      <span class="text-slate-300">|</span>
                      <form action="?/deleteRecord" method="POST" use:enhance class="inline">
                        <input type="hidden" name="id" value={record.id} />
                        <button type="submit" class="text-red-600 hover:text-red-800 text-xs">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>