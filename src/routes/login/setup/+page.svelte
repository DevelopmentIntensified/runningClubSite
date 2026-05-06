<script lang="ts">
  import { goto } from '$app/navigation';

  let firstName = '';
  let lastName = '';
  let stateOfOrigin = '';
  let error = '';
  let waiting = false;

  async function handleSubmit() {
    if (!firstName.trim() || !lastName.trim()) {
      error = 'First name and last name are required';
      return;
    }

    waiting = true;
    error = '';

    const res = await fetch('/login/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), stateOfOrigin: stateOfOrigin.trim() || null })
    });

    const json = await res.json();
    if (json.error) {
      error = json.error;
    } else {
      await goto(json.redirectTo || '/groupme');
      location.reload();
    }
    waiting = false;
  }
</script>

<svelte:head>
  <title>Complete Your Profile - Liberty Running Club</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
      <p class="mt-2 text-sm text-gray-600">We just need a few more details to finish setting up your account.</p>
    </div>

    {#if error}
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    {/if}

    <form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            class="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 leading-5 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="John"
            bind:value={firstName}
          />
        </div>
      </div>

      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            class="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 leading-5 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="Doe"
            bind:value={lastName}
          />
        </div>
      </div>

      <div>
        <label for="stateOfOrigin" class="block text-sm font-medium text-gray-700">State of Origin</label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <input
            id="stateOfOrigin"
            name="stateOfOrigin"
            type="text"
            class="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 leading-5 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="Virginia"
            bind:value={stateOfOrigin}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={waiting}
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Complete Setup
        </button>
      </div>
    </form>
  </div>
</div>
