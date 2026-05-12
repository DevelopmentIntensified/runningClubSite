<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');

  let filteredLogs = $derived(
    data.logs.filter(log => {
      if (!searchTerm) return true;
      const s = searchTerm.toLowerCase();
      return log.action.toLowerCase().includes(s) ||
        (log.targetType || '').toLowerCase().includes(s) ||
        (log.details || '').toLowerCase().includes(s) ||
        String(log.targetId || '').includes(s);
    })
  );
</script>

<svelte:head>
  <title>Admin Dashboard - Liberty Running Club</title>
</svelte:head>

<div class="p-4 sm:p-6 lg:p-8">
  <h1 class="mb-6 text-2xl font-bold text-slate-800">Admin Dashboard</h1>

  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold text-slate-800">Audit Log</h2>
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search logs..."
            class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-72"
          />
          <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    {#if filteredLogs.length === 0}
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="mt-4 text-sm text-slate-500">No logs found</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/50">
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Time</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Admin</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Target</th>
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each filteredLogs as log}
              <tr class="hover:bg-slate-50/50 transition-colors">
                <td class="whitespace-nowrap px-6 py-3 text-sm text-slate-600">{new Date(log.createdAt).toLocaleString()}</td>
                <td class="whitespace-nowrap px-6 py-3 text-sm text-slate-700">{log.adminId}</td>
                <td class="whitespace-nowrap px-6 py-3">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {log.action === 'create' ? 'bg-emerald-100 text-emerald-700' : log.action === 'update' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}">
                    {log.action}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-3 text-sm text-slate-600">{log.targetType || '—'}{log.targetId ? ` #${log.targetId}` : ''}</td>
                <td class="px-6 py-3 text-sm text-slate-600 max-w-xs truncate" title={log.details || ''}>{log.details || '—'}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="border-t border-slate-200 px-6 py-3 text-xs text-slate-400">
        Showing {filteredLogs.length} of {data.logs.length} entries
      </div>
    {/if}
  </div>
</div>
