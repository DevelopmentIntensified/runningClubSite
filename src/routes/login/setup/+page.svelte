<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let firstName = '';
  let lastName = '';
  let stateOfOrigin = '';
  let error = '';
  let waiting = false;
  let redirectUrl = '/groupme';

  let stateSearch = '';
  let stateDropdownOpen = false;

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

  $: filteredStates = stateSearch === ''
    ? usStates
    : usStates.filter(s => s.name.toLowerCase().includes(stateSearch.toLowerCase()));

  function selectState(state: { name: string; abbr: string }) {
    stateOfOrigin = state.abbr;
    stateSearch = state.name;
    stateDropdownOpen = false;
  }

  function handleStateInput(e: Event) {
    stateSearch = (e.target as HTMLInputElement).value;
    stateDropdownOpen = true;
    if (stateSearch === '') {
      stateOfOrigin = '';
    }
  }

  function handleStateBlur() {
    setTimeout(() => {
      stateDropdownOpen = false;
    }, 200);
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('redirectUrl')) {
      redirectUrl = params.get('redirectUrl') as string;
    }
  });

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
      body: JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), stateOfOrigin: stateOfOrigin || null, redirectUrl })
    });

    const json = await res.json();
    if (json.error) {
      error = json.error;
    } else {
      await goto(json.redirectTo || redirectUrl);
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

      <div class="relative">
        <label for="stateOfOrigin" class="block text-sm font-medium text-gray-700">State of Origin</label>
        <div class="relative mt-1">
          <input
            id="stateOfOrigin"
            name="stateOfOrigin"
            type="text"
            class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 leading-5 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            placeholder="Start typing to search..."
            value={stateSearch}
            on:input={handleStateInput}
            on:focus={() => { stateDropdownOpen = true; }}
            on:blur={handleStateBlur}
          />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>

        {#if stateDropdownOpen && filteredStates.length > 0}
          <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
            {#each filteredStates as state}
              <li
                class="cursor-pointer px-3 py-2 hover:bg-primary-100 {stateOfOrigin === state.abbr ? 'bg-primary-50' : ''}"
                on:mousedown={() => selectState(state)}
              >
                {state.name}
              </li>
            {/each}
          </ul>
        {/if}
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
