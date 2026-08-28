<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const { features, users, deniedUserMap } = data;

  const MODE_LABELS: Record<string, string> = {
    public: 'Everyone',
    login: 'Logged-in users',
    admin: 'Admins only'
  };

  function isLocked(key: string): boolean {
    return key === 'admin';
  }

  function userName(id: number): string {
    const u = users.find((user) => user.id === id);
    if (!u) return `User #${id}`;
    if (u.firstName && u.lastName) return `${u.firstName} ${u.lastName} (${u.email})`;
    return u.email;
  }
</script>

<svelte:head>
  <title>Feature Access - Liberty Running Club</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-slate-800">Feature Access</h1>
      <p class="mt-1 text-sm text-slate-500">
        Control who can access each feature. Admins always have access to everything.
      </p>
    </div>
  </div>

  {#each features as feature (feature.key)}
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="border-b border-slate-200 px-6 py-4">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-slate-800">{feature.name}</h2>
            {#if feature.description}
              <p class="mt-0.5 text-sm text-slate-500">{feature.description}</p>
            {/if}
          </div>
          {#if isLocked(feature.key)}
            <span
              class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
            >
              Locked · Admins only
            </span>
          {/if}
        </div>
      </div>

      <div class="px-6 py-4">
        <form
          action="?/setMode"
          method="POST"
          use:enhance
          class="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input type="hidden" name="key" value={feature.key} />
          <select
            name="mode"
            disabled={isLocked(feature.key)}
            class="focus:border-primary-500 focus:ring-primary-500/20 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:ring-2 focus:outline-none sm:w-64"
          >
            {#each Object.entries(MODE_LABELS) as [value, label]}
              <option {value} selected={feature.mode === value}>{label}</option>
            {/each}
          </select>
          <button
            type="submit"
            disabled={isLocked(feature.key)}
            class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:bg-slate-300"
          >
            Save Mode
          </button>
        </form>

        {#if !isLocked(feature.key)}
          <div class="mt-6 border-t border-slate-100 pt-4">
            <h3 class="mb-3 text-sm font-semibold text-slate-700">Denied Users</h3>
            <p class="mb-3 text-sm text-slate-500">
              Denying a user removes their access to this feature regardless of the mode above.
              Admins are never affected.
            </p>

            {#if (deniedUserMap[feature.key] || []).length === 0}
              <p class="mb-3 text-sm text-slate-500">No users are denied this feature.</p>
            {:else}
              <ul class="mb-4 space-y-2">
                {#each deniedUserMap[feature.key] || [] as userId (userId)}
                  <li
                    class="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2"
                  >
                    <span class="text-sm text-slate-700">{userName(userId)}</span>
                    <form action="?/allowUser" method="POST" use:enhance class="inline">
                      <input type="hidden" name="key" value={feature.key} />
                      <input type="hidden" name="userId" value={userId} />
                      <button
                        type="submit"
                        class="text-xs font-medium text-emerald-600 hover:text-emerald-800"
                      >
                        Allow
                      </button>
                    </form>
                  </li>
                {/each}
              </ul>
            {/if}

            <form
              action="?/denyUser"
              method="POST"
              use:enhance
              class="flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <input type="hidden" name="key" value={feature.key} />
              <select
                name="userId"
                class="focus:border-primary-500 focus:ring-primary-500/20 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:ring-2 focus:outline-none sm:flex-1"
              >
                <option value="">Select a user to deny access…</option>
                {#each users as user (user.id)}
                  {#if !(deniedUserMap[feature.key] || []).includes(user.id)}
                    <option value={user.id}>{userName(user.id)}</option>
                  {/if}
                {/each}
              </select>
              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
              >
                Deny Access
              </button>
            </form>
          </div>
        {/if}
      </div>
    </div>
  {/each}

  <div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-sm text-slate-600">
    <p class="font-semibold text-slate-700">How access works</p>
    <ul class="mt-2 list-disc space-y-1 pl-5">
      <li><span class="font-medium">Everyone</span> — viewable without logging in.</li>
      <li>
        <span class="font-medium">Logged-in users</span> — anyone with an account (unless denied).
      </li>
      <li>
        <span class="font-medium">Admins only</span> — only admins (used for the Admin Dashboard).
      </li>
      <li>
        <span class="font-medium">Deny a user</span> — removes that individual's access regardless of
        the global mode. Admins are always exempt.
      </li>
      <li>
        <span class="font-medium">Grant full access</span> — make the user an admin (they get access to
        every feature).
      </li>
    </ul>
  </div>
</div>
