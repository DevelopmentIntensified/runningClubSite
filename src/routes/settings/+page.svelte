<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let { user } = data;

  let profileSuccess = $state('');
  let passwordForm: HTMLFormElement | undefined;
  let passwordSuccess = $state('');

  const usStatesList = [
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

  function confirmProfileChange() {
    return window.confirm('Are you sure you want to update your profile? Your changes will be logged and visible to administrators.');
  }
</script>

<svelte:head>
  <title>Settings - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-2xl space-y-8">
    <h1 class="text-3xl font-extrabold text-gray-900">Settings</h1>

    <div class="rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="mb-6 text-xl font-semibold text-gray-900">Profile</h2>
      <form
        action="?/updateProfile"
        method="POST"
        use:enhance={() => {
          profileSuccess = '';
          return async ({ result }) => {
            if (result.type === 'success') {
              profileSuccess = 'Profile updated.';
            }
          };
        }}
        class="space-y-4"
        onsubmit={confirmProfileChange}
      >
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName" name="firstName" type="text" required
            value={user.firstName || ''}
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName" name="lastName" type="text" required
            value={user.lastName || ''}
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="stateOfOrigin" class="block text-sm font-medium text-gray-700">State of Origin</label>
          <select
            id="stateOfOrigin" name="stateOfOrigin" required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Select a state</option>
            {#each usStatesList as state}
              <option value={state.abbr} selected={user.stateOfOrigin === state.abbr}>{state.name}</option>
            {/each}
          </select>
          <p class="mt-1 text-xs text-amber-600">Please do not change your state of origin unless it is incorrect.</p>
        </div>
        <div>
          <label for="graduationYear" class="block text-sm font-medium text-gray-700">Graduation Year</label>
          <select
            id="graduationYear" name="graduationYear"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Select graduation year</option>
            {#each Array.from({ length: 7 }, (_, i) => new Date().getFullYear() + i) as year}
              <option value={year} selected={user.graduationYear === year}>{year}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="academicLevel" class="block text-sm font-medium text-gray-700">Academic Level</label>
          <select
            id="academicLevel" name="academicLevel"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="undergraduate" selected={user.academicLevel === 'undergraduate'}>Undergraduate</option>
            <option value="graduate" selected={user.academicLevel === 'graduate'}>Graduate</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-sm text-gray-500">{user.email}</p>
        </div>
        {#if profileSuccess}
          <p class="text-sm text-emerald-600">{profileSuccess}</p>
        {/if}
        <div class="flex items-center gap-4">
          <button
            type="submit"
            class="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Save Profile
          </button>
          {#if user.lastUpdated}
            <span class="text-xs text-gray-400">Last updated: {new Date(user.lastUpdated).toLocaleDateString()}</span>
          {/if}
        </div>
      </form>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="mb-6 text-xl font-semibold text-gray-900">Change Password</h2>
      <form
        action="?/changePassword"
        method="POST"
        use:enhance={() => {
          passwordSuccess = '';
          return async ({ result }) => {
            if (result.type === 'success' && result.data?.success) {
              passwordSuccess = 'Password changed.';
              passwordForm?.reset();
            }
          };
        }}
        class="space-y-4"
      >
        <div>
          <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            id="currentPassword" name="currentPassword" type="password" required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="newPassword" name="newPassword" type="password" required minlength={8}
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            id="confirmPassword" name="confirmPassword" type="password" required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
          />
        </div>
        {#if passwordSuccess}
          <p class="text-sm text-emerald-600">{passwordSuccess}</p>
        {/if}
        <button
          type="submit"
          class="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Change Password
        </button>
      </form>
    </div>
  </div>
</div>
