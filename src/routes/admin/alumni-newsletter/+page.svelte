<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Alumni Newsletter Signups - Liberty Running Club Admin</title>
</svelte:head>

<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <h2 class="text-xl font-semibold text-slate-800">Alumni Newsletter Signups</h2>
    <p class="mt-1 text-sm text-slate-500">{data.signups.length} total signups</p>
  </div>

  {#if data.signups.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No signups yet</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase hidden md:table-cell"
              >First Name</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase hidden md:table-cell"
              >Last Name</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Email</th
            >
            <th
              class="px-6 py-3.5 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase hidden md:table-cell"
              >Signed Up</th
            >
            <th
              class="px-6 py-3.5 text-right text-xs font-semibold tracking-wide text-slate-500 uppercase"
              >Actions</th
            >
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each data.signups as signup (signup.id)}
            <tr class="transition-colors hover:bg-slate-50/50">
              <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-700 hidden md:table-cell"
                >{signup.firstName}</td
              >
              <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600 hidden md:table-cell">{signup.lastName}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600">{signup.email}</td>
              <td class="px-6 py-4 text-sm whitespace-nowrap text-slate-600 hidden md:table-cell">
                {new Date(signup.createdAt).toLocaleDateString()}
              </td>
              <td class="px-6 py-4 text-right text-sm whitespace-nowrap">
                <form action="?/deleteSignup" method="POST" use:enhance class="inline">
                  <input type="hidden" name="id" value={signup.id} />
                  <button type="submit" class="text-xs text-red-600 hover:text-red-800"
                    >Delete</button
                  >
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
