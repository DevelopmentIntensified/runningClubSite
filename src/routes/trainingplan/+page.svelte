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

  <div class="overflow-hidden rounded-2xl bg-white shadow-xl">
      <p class="mb-6 text-lg">
We’re excited to offer training for the upcoming XC season! Whether you are:
            </p>
      <ol class="mb-8 list-inside list-disc text-lg">
        <li>A former NCAA athlete who wants to continue competing</li>
        <li>Just Starting to run</li>
        <li>Training for a marathon, half marathon, or any other distance</li>
        <li>
          Gearing up for cross-country (XC) this fall, we have plenty of competitive opportunities
        </li>
        <li>Trying to walk on to the NCAA team</li>
      </ol>
      <p class="mb-6 text-lg">
       Click the link below to get started if you have any questions, DM George Crowder, Jill Crunkilton, or Evan O’Connor on groupme!
            </p>
      <div class="mt-3 w-full text-center">
        <a
          href="https://docs.google.com/spreadsheets/d/1fx53SWI4L8bhY-5AUIqFKhHssEc8_RXw/edit?usp=sharing&ouid=103574296355760746415&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white transition duration-150 ease-in-out hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
                    Fall Semester Training Plan
        </a>
      </div>
    </div>
  </div>
