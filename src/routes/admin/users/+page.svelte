<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');
  
  let filteredUsers = $derived.by(() => {
    let result = [...data.users];
    if (searchTerm) {
      result = result.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return result;
  });

  function handleSort(sortBy: string) {
    const url = new URL(window.location.href);
    url.searchParams.set('sort', sortBy);
    goto(url.toString());
  }

  function formatDate(date: Date | null | undefined): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
</script>

<svelte:head>
  <title>Manage Users - Liberty Running Club</title>
</svelte:head>

<div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Users</h2>
      
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search by email"
            class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-64"
          />
          <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={data.sortBy}
          onchange={(e) => handleSort((e.target as HTMLSelectElement).value)}
          class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          <option value="email">Sort by Email</option>
          <option value="createdAt">Sort by Date Created</option>
          <option value="lastLogin">Sort by Last Login</option>
        </select>
      </div>
    </div>
  </div>

  {#if filteredUsers.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No users found</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">State</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Grad Year</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Level</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Admin</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date Created</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Last Login</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredUsers as user (user.id)}
            <tr class="hover:bg-slate-50/50 transition-colors">
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : '—'}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{user.email}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{user.stateOfOrigin || '—'}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{user.graduationYear || '—'}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{user.academicLevel === 'graduate' ? 'Graduate' : user.academicLevel === 'undergraduate' ? 'Undergrad' : '—'}</td>
              <td class="whitespace-nowrap px-6 py-4">
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {user.isAdmin ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}">
                  {user.isAdmin ? 'Yes' : 'No'}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{formatDate(user.createdAt)}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{formatDate(user.lastLogin)}</td>
              <td class="whitespace-nowrap px-6 py-4 text-sm">
                <div class="flex items-center gap-3">
                  <a href="/admin/users/{user.id}/edit" class="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</a>
                  <span class="text-slate-300">|</span>
                  <form action="?/deleteUser" method="POST" use:enhance class="inline">
                    <input type="hidden" name="id" value={user.id} />
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