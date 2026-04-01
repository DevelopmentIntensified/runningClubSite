<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');

  let filteredAlumni = $derived.by(() => {
    let result = [...data.alumni];
    if (searchTerm) {
      result = result.filter(alumnus => 
        alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumnus.currentOccupation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumnus.graduationYear?.toString().includes(searchTerm)
      );
    }
    return result.sort((a, b) => b.graduationYear - a.graduationYear);
  });
</script>

<svelte:head>
  <title>Manage Alumni - Liberty Running Club</title>
</svelte:head>

<div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Alumni</h2>
      
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search by name, occupation, or year"
            class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-80"
          />
          <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <a
          href="/admin/alumni/new"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Alumnus
        </a>
      </div>
    </div>
  </div>

  {#if filteredAlumni.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No alumni found</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Image</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Graduation Year</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Occupation</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredAlumni as alumnus (alumnus.id)}
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="whitespace-nowrap px-6 py-4">
                <img src={alumnus.imageUrl} alt={alumnus.name} class="h-12 w-16 rounded-lg object-cover shadow-sm" />
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">{alumnus.name}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{alumnus.graduationYear}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{alumnus.currentOccupation}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm">
                <div class="flex items-center gap-3">
                  <a href="/admin/alumni/{alumnus.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                  <span class="text-slate-300">|</span>
                  <form action="?/deleteAlumnus" method="POST" use:enhance class="inline">
                    <input type="hidden" name="id" value={alumnus.id} />
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