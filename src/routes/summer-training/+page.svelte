<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const trainingImg = data.image.imageUrl;
</script>

<svelte:head>
  <title>Summer Training Signup - Liberty Running Club</title>
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
        <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Summer Training Signup</h1>
        <p class="mt-2 text-sm text-white/90 sm:text-base">Get ready for the upcoming season</p>
      </div>
    </div>
  </div>

  <div class="overflow-hidden rounded-2xl bg-white shadow-xl p-6">
    <p class="mb-6 text-lg">
      Sign up for our summer training program! Whether you're looking to maintain your fitness, prepare for fall racing, or just stay active during the summer months, we've got you covered.
    </p>
    <p class="mb-6 text-lg">
      If you have any questions, DM George Crowder, Jill Crunkilton, or Evan O'Connor on groupme!
    </p>
    <div class="mt-6 w-full">
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLSdYpov_P1dT_fnmX4S6CEEqdwHx2KCBMKx4zqwne1t3LzdhZA/viewform?embedded=true"
        class="h-[800px] w-full border-0"
        title="Summer Training Signup"
      >
        Loading...
      </iframe>
    </div>
  </div>
</div>