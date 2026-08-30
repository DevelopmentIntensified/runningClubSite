<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Alumni - Liberty Running Club</title>
  <meta
    name="description"
    content="Meet the alumni of the Liberty University Running Club and stay connected with fellow alumni."
  />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-3xl font-bold sm:text-4xl">Our Alumni</h1>
  <h3 class="text-center text-base sm:text-lg md:text-xl">
    Are you one of our alumni? Don't see yourself here? Feel free to <a
      class="text-primary-700 hover:text-primary-800"
      href="/contact1">Contact us</a
    >
    and ask us to add you. You should also join our
    <a
      href="https://alumnicommunity.liberty.edu/groups/92/feed"
      class="text-primary-700 hover:text-primary-800">Alumni Group</a
    >. We look forward to seeing you there!
  </h3>
  <p class="mt-4 text-center">
    <a
      href="/alumni-newsletter"
      class="bg-primary-600 hover:bg-primary-700 inline-block rounded-lg px-6 py-3 font-medium text-white"
    >
      Sign Up for Alumni Newsletter
    </a>
  </p>

  {#if data.alumni.length}
    <div class="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each data.alumni as alumnus}
        <div class="overflow-hidden rounded-lg bg-white shadow-lg">
          {#if alumnus.imageUrl}
            <img
              src={alumnus.imageUrl}
              alt={alumnus.name}
              loading="lazy"
              decoding="async"
              class="h-96 w-full object-cover"
            />
          {:else}
            <div class="flex h-96 w-full items-center justify-center bg-gray-300">
              <span class="text-2xl text-gray-500">No Image</span>
            </div>
          {/if}
          <div class="p-6">
            <h2 class="mb-2 text-xl font-semibold">{alumnus.name}</h2>
            <p class="mb-2 text-gray-600">Class of {alumnus.graduationYear}</p>
            {#if alumnus.currentOccupation}
              <p class="mb-2 text-gray-600">Current: {alumnus.currentOccupation}</p>
            {/if}
            {#if alumnus.achievements}
              <p class="text-gray-600">{alumnus.achievements}</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="mt-8 flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">No alumni yet</h3>
      <p class="mt-1 text-gray-500">Check back soon for updates</p>
    </div>
  {/if}
</div>
