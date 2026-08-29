<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchTerm = $state('');

  // US state abbreviations -> full names, so state search matches "VA" or "Virginia".
  const stateNames: Record<string, string> = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming'
  };

  // Per-user feature denial modal state (checked = user is denied this feature).
  let accessUser = $state<{ id: number; email: string } | null>(null);
  let accessSelection = $state<Record<string, boolean>>({});
  let accessSaveState = $state<'idle' | 'saving' | 'saved'>('idle');

  const editableFeatures = $derived((data.features || []).filter((f) => f.key !== 'admin'));

  function openAccess(user: { id: number; email: string }) {
    accessUser = { id: user.id, email: user.email };
    accessSaveState = 'idle';
    const denied = new Set(data.deniedFeatureMap[user.id] || []);
    const next: Record<string, boolean> = {};
    for (const f of editableFeatures) {
      next[f.key] = denied.has(f.key);
    }
    accessSelection = next;
  }

  function closeAccess() {
    accessUser = null;
    accessSaveState = 'idle';
  }

  let filteredUsers = $derived.by(() => {
    let result = [...data.users];
    if (searchTerm) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter((user) => {
        const stateAbbr = user.stateOfOrigin?.toLowerCase() ?? '';
        const stateName = (stateNames[user.stateOfOrigin?.toUpperCase() ?? ''] ?? '').toLowerCase();
        return (
          user.email.toLowerCase().includes(q) ||
          (user.firstName && user.firstName.toLowerCase().includes(q)) ||
          (user.lastName && user.lastName.toLowerCase().includes(q)) ||
          stateAbbr.includes(q) ||
          stateName.includes(q)
        );
      });
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

<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">Users</h2>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative">
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Search by email, name, or state"
            class="focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:ring-2 focus:outline-none sm:w-64"
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
        <select
          value={data.sortBy}
          onchange={(e) => handleSort((e.target as HTMLSelectElement).value)}
          class="focus:border-primary-500 focus:ring-primary-500/20 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:ring-2 focus:outline-none"
        >
          <option value="email">Sort by Email</option>
          <option value="createdAt">Sort by Date Created</option>
          <option value="lastLogin">Sort by Last Login</option>
          <option value="lastUpdated">Sort by Last Updated</option>
        </select>
      </div>
    </div>
  </div>

  {#if filteredUsers.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No users found</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Name</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Email</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Admin</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Status</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >State</th
            >
            <th
              class="hidden px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase md:table-cell"
              >Last Login</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Actions</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredUsers as user (user.id)}
            <tr class="transition-colors hover:bg-slate-50/50">
              <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-700"
                >{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : '—'}</td
              >
              <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{user.email}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {user.isAdmin
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'}"
                >
                  {user.isAdmin ? 'Yes' : 'No'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {user.banned
                    ? 'bg-red-100 text-red-700'
                    : 'bg-emerald-100 text-emerald-700'}"
                >
                  {user.banned ? 'Banned' : 'Active'}
                </span>
              </td>
              <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600"
                >{user.stateOfOrigin
                  ? (stateNames[user.stateOfOrigin.toUpperCase()] ?? user.stateOfOrigin)
                  : '—'}</td
              >
              <td class="hidden px-6 py-4 text-sm whitespace-nowrap text-slate-600 md:table-cell"
                >{formatDate(user.lastLogin)}</td
              >
              <td class="px-6 py-4 text-sm whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <a
                    href="/admin/users/{user.id}/edit"
                    class="text-primary-600 hover:text-primary-800 text-xs font-medium">Edit</a
                  >
                  <span class="text-slate-300">|</span>
                  <button
                    type="button"
                    onclick={() => openAccess(user)}
                    class="text-primary-600 hover:text-primary-800 text-xs font-medium"
                  >
                    Access
                  </button>
                  <span class="text-slate-300">|</span>
                  {#if user.banned}
                    <form action="?/unbanUser" method="POST" use:enhance class="inline">
                      <input type="hidden" name="id" value={user.id} />
                      <button type="submit" class="text-xs text-emerald-600 hover:text-emerald-800"
                        >Unban</button
                      >
                    </form>
                  {:else}
                    <form
                      action="?/banUser"
                      method="POST"
                      use:enhance
                      class="inline"
                      onsubmit={(e) => {
                        if (!confirm(`Ban ${user.email}? This logs them out immediately.`)) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="id" value={user.id} />
                      <button type="submit" class="text-xs text-red-600 hover:text-red-800"
                        >Ban</button
                      >
                    </form>
                  {/if}
                  <span class="text-slate-300">|</span>
                  <form action="?/deleteUser" method="POST" use:enhance class="inline">
                    <input type="hidden" name="id" value={user.id} />
                    <button type="submit" class="text-xs text-red-600 hover:text-red-800"
                      >Delete</button
                    >
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

{#if accessUser}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    role="dialog"
    aria-modal="true"
    onclick={closeAccess}
  >
    <div
      class="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h3 class="text-lg font-semibold text-slate-800">Feature Access</h3>
        <button type="button" onclick={closeAccess} class="text-slate-400 hover:text-slate-600"
          >✕</button
        >
      </div>
      <form
        action="?/updateUserFeatureAccess"
        method="POST"
        use:enhance={() => {
          accessSaveState = 'saving';
          return async ({ update, result }) => {
            await update({ reset: false });
            accessSaveState = result.type === 'success' ? 'saved' : 'idle';
          };
        }}
        class="space-y-4 p-6"
      >
        <p class="text-sm text-slate-600">
          Tick a feature to <strong>revoke {accessUser.email}'s</strong> access to it. This overrides
          the feature's global mode. Leave unticked to follow the global setting. Admins are never affected.
        </p>
        {#if accessSaveState === 'saving'}
          <div
            class="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700"
          >
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Saving access changes…
          </div>
        {:else if accessSaveState === 'saved'}
          <div
            class="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Access changes saved for {accessUser.email}.
          </div>
        {/if}
        <input type="hidden" name="userId" value={accessUser.id} />
        <div class="max-h-72 space-y-2 overflow-y-auto">
          {#each editableFeatures as feature}
            <label
              class="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 transition-colors hover:bg-slate-50"
            >
              <span>
                <span class="block text-sm font-medium text-slate-700">{feature.name}</span>
                <span class="block text-xs text-slate-500">{feature.description}</span>
              </span>
              <input
                type="checkbox"
                name="denied"
                value={feature.key}
                checked={accessSelection[feature.key]}
                onchange={(e) => {
                  accessSelection[feature.key] = (e.target as HTMLInputElement).checked;
                }}
                class="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
            </label>
          {/each}
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onclick={closeAccess}
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={accessSaveState === 'saving'}
            class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {accessSaveState === 'saving' ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
