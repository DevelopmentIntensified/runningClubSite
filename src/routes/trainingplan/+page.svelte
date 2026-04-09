<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const trainingImg = data.image.imageUrl;
</script>

<svelte:head>
  <title>Training Plan - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="relative mb-8 h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80">
    <img
      src={trainingImg}
      alt={data.image.alt}
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60">
      <div class="px-4 text-center">
        <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Training Plan</h1>
        <p class="mt-2 text-sm text-white/90 sm:text-base">Elevate your running game</p>
      </div>
    </div>
  </div>

  <div class="overflow-hidden rounded-2xl bg-white shadow-xl p-6">
    <p class="mb-6 text-lg">
      We're excited to offer training for the upcoming XC season! Whether you are:
    </p>
    <ol class="mb-8 list-inside list-disc text-lg">
      <li>A former NCAA athlete who wants to continue competing</li>
      <li>Just Starting to run</li>
      <li>Training for a marathon, half marathon, or any other distance</li>
      <li>Gearing up for cross-country (XC) this fall, we have plenty of competitive opportunities</li>
      <li>Trying to walk on to the NCAA team</li>
    </ol>
    <p class="mb-6 text-lg">
      If you have any questions, DM George Crowder, Jill Crunkilton, or Evan O'Connor on groupme!
    </p>
    <div class="mt-6 w-full">
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLSdYpov_P1dT_fnmX4S6CEEqdwHx2KCBMKx4zqwne1t3LzdhZA/viewform?embedded=true"
        class="h-[800px] w-full border-0"
        title="Training Plan Signup"
      >
        Loading...
      </iframe>
    </div>
  </div>

  <div class="mt-8 overflow-hidden rounded-2xl bg-white shadow-xl p-6">
    <h2 class="mb-4 text-2xl font-bold">Looking for Summer Training?</h2>
    <p class="mb-4 text-lg">
      Check out our Summer Training Signup to get prepared for the upcoming season!
    </p>
    <a
      href="/summer-training"
      class="inline-flex items-center rounded-md bg-secondary px-6 py-3 text-base font-medium text-white transition duration-150 ease-in-out hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2"
    >
      Summer Training Signup
    </a>
  </div>
</div>