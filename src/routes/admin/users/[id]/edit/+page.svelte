<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;

  let { User, changeLog } = data;
  let error = '';

  const usStates = [
    { name: 'Alabama', abbr: 'AL' }, { name: 'Alaska', abbr: 'AK' }, { name: 'Arizona', abbr: 'AZ' },
    { name: 'Arkansas', abbr: 'AR' }, { name: 'California', abbr: 'CA' }, { name: 'Colorado', abbr: 'CO' },
    { name: 'Connecticut', abbr: 'CT' }, { name: 'Delaware', abbr: 'DE' }, { name: 'Florida', abbr: 'FL' },
    { name: 'Georgia', abbr: 'GA' }, { name: 'Hawaii', abbr: 'HI' }, { name: 'Idaho', abbr: 'ID' },
    { name: 'Illinois', abbr: 'IL' }, { name: 'Indiana', abbr: 'IN' }, { name: 'Iowa', abbr: 'IA' },
    { name: 'Kansas', abbr: 'KS' }, { name: 'Kentucky', abbr: 'KY' }, { name: 'Louisiana', abbr: 'LA' },
    { name: 'Maine', abbr: 'ME' }, { name: 'Maryland', abbr: 'MD' }, { name: 'Massachusetts', abbr: 'MA' },
    { name: 'Michigan', abbr: 'MI' }, { name: 'Minnesota', abbr: 'MN' }, { name: 'Mississippi', abbr: 'MS' },
    { name: 'Missouri', abbr: 'MO' }, { name: 'Montana', abbr: 'MT' }, { name: 'Nebraska', abbr: 'NE' },
    { name: 'Nevada', abbr: 'NV' }, { name: 'New Hampshire', abbr: 'NH' }, { name: 'New Jersey', abbr: 'NJ' },
    { name: 'New Mexico', abbr: 'NM' }, { name: 'New York', abbr: 'NY' }, { name: 'North Carolina', abbr: 'NC' },
    { name: 'North Dakota', abbr: 'ND' }, { name: 'Ohio', abbr: 'OH' }, { name: 'Oklahoma', abbr: 'OK' },
    { name: 'Oregon', abbr: 'OR' }, { name: 'Pennsylvania', abbr: 'PA' }, { name: 'Rhode Island', abbr: 'RI' },
    { name: 'South Carolina', abbr: 'SC' }, { name: 'South Dakota', abbr: 'SD' }, { name: 'Tennessee', abbr: 'TN' },
    { name: 'Texas', abbr: 'TX' }, { name: 'Utah', abbr: 'UT' }, { name: 'Vermont', abbr: 'VT' },
    { name: 'Virginia', abbr: 'VA' }, { name: 'Washington', abbr: 'WA' }, { name: 'West Virginia', abbr: 'WV' },
    { name: 'Wisconsin', abbr: 'WI' }, { name: 'Wyoming', abbr: 'WY' }
  ];

  function confirmUpdate() {
    return window.confirm('Are you sure you want to update this user? Changes to name, state, or graduation year will be logged.');
  }
</script>

<svelte:head>
  <title>Edit user - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-3xl space-y-8">
    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-primary-600 px-4 py-6 sm:px-6">
        <h2 class="text-center text-3xl font-extrabold text-white">Edit user</h2>
      </div>
      <div class="p-6 sm:p-8">
        <form action="?/updateUser" method="POST" use:enhance class="space-y-6" onsubmit={confirmUpdate}>
          <input type="hidden" name="id" value={User.id} />
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" id="email" name="email" value={User.email}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text" id="firstName" name="firstName" value={User.firstName || ''}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text" id="lastName" name="lastName" value={User.lastName || ''}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="stateOfOrigin" class="block text-sm font-medium text-gray-700">State of Origin</label>
            <select
              id="stateOfOrigin" name="stateOfOrigin"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Select a state</option>
              {#each usStates as state}
                <option value={state.abbr} selected={User.stateOfOrigin === state.abbr}>{state.name}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="graduationYear" class="block text-sm font-medium text-gray-700">Graduation Year</label>
            <select
              id="graduationYear" name="graduationYear"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Not set</option>
              {#each Array.from({ length: 7 }, (_, i) => new Date().getFullYear() + i) as year}
                <option value={year} selected={User.graduationYear === year}>{year}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="isAdmin" class="block text-sm font-medium text-gray-700">Admin</label>
            <input
              type="text" id="isAdmin" name="isAdmin" value={User.isAdmin}
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
          {#if error}
            <div class="text-sm text-red-500">{error}</div>
          {/if}
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Update user
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="overflow-hidden rounded-lg bg-white shadow-xl">
      <div class="bg-slate-700 px-4 py-4 sm:px-6">
        <h3 class="text-xl font-bold text-white">Change Log</h3>
      </div>
      <div class="p-6 sm:p-8">
        {#if changeLog.length === 0}
          <p class="text-sm text-gray-500">No changes recorded.</p>
        {:else}
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50/50">
                  <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Field</th>
                  <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Old Value</th>
                  <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">New Value</th>
                  <th class="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-500">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                {#each changeLog as entry}
                  <tr class="hover:bg-slate-50/50">
                    <td class="px-4 py-2 text-sm text-slate-700">{entry.field}</td>
                    <td class="px-4 py-2 text-sm text-slate-600">{entry.oldValue || '—'}</td>
                    <td class="px-4 py-2 text-sm text-slate-600">{entry.newValue || '—'}</td>
                    <td class="px-4 py-2 text-sm text-slate-600">{new Date(entry.changedAt).toLocaleDateString()}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
