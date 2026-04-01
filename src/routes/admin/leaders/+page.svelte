<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');

  let filteredLeaders = $derived.by(() => {
    let result = [...data.leaders];
    if (searchTerm) {
      result = result.filter(leader => 
        leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leader.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result.sort((a, b) => a.order - b.order);
  });
</script>

<svelte:head>
  <title>Manage Leaders - Liberty Running Club</title>
</svelte:head>

<div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Leaders</h2>
      
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search by name or position"
            class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-64"
          />
          <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <a
          href="/admin/leaders/new"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Leader
        </a>
      </div>
    </div>
  </div>

  {#if filteredLeaders.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No leaders found</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Order</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Position</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredLeaders as leader (leader.id)}
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">{leader.name}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{leader.order}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{leader.position}</td>
              <td class="whitespace-nowrap px-6 py-4">
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {leader.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
                  {leader.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm">
                <div class="flex items-center gap-3">
                  <a href="/admin/leaders/{leader.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                  <span class="text-slate-300">|</span>
                  <form action="?/deleteLeader" method="POST" use:enhance class="inline">
                    <input type="hidden" name="id" value={leader.id} />
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