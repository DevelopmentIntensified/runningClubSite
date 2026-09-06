<script lang="ts">
  import type { PageData } from './$types';
  import { formatChangeDetails } from '$lib/utils/formatChangeDetails';
  import { DISCOVERY_SOURCES } from '$lib/onboarding/discovery';

  let { data }: { data: PageData } = $props();

  const DISCOVERY_LABELS: Record<string, string> = {
    friend: 'A friend or classmate',
    'social-media': 'Social media',
    flyer: 'Flyer or poster',
    event: 'A campus event',
    other: 'Other'
  };

  let searchTerm = $state('');

  let discoveryTotal = $derived(data.discoveryCounts.reduce((sum, c) => sum + c.count, 0));

  let discoveryRows = $derived(
    DISCOVERY_SOURCES.map((source) => {
      const found = data.discoveryCounts.find((c) => c.source === source);
      const count = found?.count ?? 0;
      return {
        source,
        label: DISCOVERY_LABELS[source] ?? source,
        count,
        pct: discoveryTotal > 0 ? Math.round((count / discoveryTotal) * 100) : 0
      };
    }).sort((a, b) => b.count - a.count)
  );

  let filteredLogs = $derived(
    data.logs.filter((log) => {
      if (!searchTerm) return true;
      const s = searchTerm.toLowerCase();
      return (
        log.action.toLowerCase().includes(s) ||
        log.adminName?.toLowerCase().includes(s) ||
        log.targetName?.toLowerCase().includes(s) ||
        (log.targetType || '').toLowerCase().includes(s) ||
        formatChangeDetails(log.parsedDetails, log.action).toLowerCase().includes(s) ||
        String(log.targetId || '').includes(s)
      );
    })
  );
</script>

<svelte:head>
  <title>Admin Dashboard - Liberty Running Club</title>
</svelte:head>

<div class="p-4 sm:p-6 lg:p-8">
  <h1 class="mb-6 text-2xl font-bold text-slate-800">Admin Dashboard</h1>

  <div class="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
      <h2 class="text-lg font-semibold text-slate-800">Discovery Sources</h2>
      <p class="text-xs text-slate-500">
        Anonymous onboarding answers — how members heard about the club
      </p>
    </div>
    <div class="px-6 py-4">
      {#if discoveryTotal === 0}
        <p class="text-sm text-slate-500">No discovery responses yet.</p>
      {:else}
        <div class="space-y-3">
          {#each discoveryRows as row (row.source)}
            <div class="flex items-center gap-3">
              <span class="w-48 shrink-0 text-sm text-slate-700">{row.label}</span>
              <div class="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  class="bg-primary-500 h-full rounded-full transition-all"
                  style="width: {row.pct}%"
                ></div>
              </div>
              <span
                class="w-20 shrink-0 text-right text-sm text-slate-600 tabular-nums"
                data-testid="discovery-count-{row.source}"
              >
                {row.count} ({row.pct}%)
              </span>
            </div>
          {/each}
        </div>
        <p class="mt-3 text-xs text-slate-400">{discoveryTotal} total responses</p>
      {/if}
    </div>
  </div>

  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold text-slate-800">Audit Log</h2>
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search logs..."
            class="focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:ring-2 focus:outline-none sm:w-72"
          />
          <svg
            class="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>

    {#if filteredLogs.length === 0}
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p class="mt-4 text-sm text-slate-500">No logs found</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/50">
              <th
                class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
                >Time</th
              >
              <th
                class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
                >Admin</th
              >
              <th
                class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
                >Action</th
              >
              <th
                class="hidden px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase md:table-cell"
                >Target</th
              >
              <th
                class="hidden px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase md:table-cell"
                >Details</th
              >
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each filteredLogs as log}
              <tr class="transition-colors hover:bg-slate-50/50">
                <td class="px-6 py-3 text-sm whitespace-nowrap text-slate-600"
                  >{new Date(log.createdAt).toLocaleString()}</td
                >
                <td class="px-6 py-3 text-sm whitespace-nowrap text-slate-700"
                  >{log.adminName || `#${log.adminId}`}</td
                >
                <td class="px-6 py-3 whitespace-nowrap">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {log.action ===
                    'create'
                      ? 'bg-emerald-100 text-emerald-700'
                      : log.action === 'update'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'}"
                  >
                    {log.action}
                  </span>
                </td>
                <td class="hidden px-6 py-3 text-sm whitespace-nowrap text-slate-600 md:table-cell"
                  >{log.targetName || log.targetType || '—'}{log.targetId && !log.targetName
                    ? ` #${log.targetId}`
                    : ''}</td
                >
                <td
                  class="hidden max-w-md px-6 py-3 text-sm text-slate-600 md:table-cell"
                  title={log.details || ''}>{formatChangeDetails(log.parsedDetails, log.action)}</td
                >
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
