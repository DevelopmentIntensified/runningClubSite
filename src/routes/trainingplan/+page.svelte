<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const trainingImg = data.image.imageUrl;
</script>

<svelte:head>
  <title>Fall Training - Liberty Running Club</title>
  <meta
    name="description"
    content="View Liberty Running Club's individualized fall training plan and get ready for the upcoming season."
  />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <div class="relative mb-8 h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80">
    <img
      src={trainingImg}
      alt={data.image.alt}
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60"
    >
      <div class="px-4 text-center">
        <h1 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Fall Training</h1>
        <p class="mt-2 text-sm text-white/90 sm:text-base">Get ready for the upcoming season</p>
      </div>
    </div>
  </div>

  <div class="overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
    <p class="mb-6 text-base sm:text-lg">
      We're excited to offer individualized fall training. Whether you are:
    </p>
    <ul class="mb-8 list-disc pl-8 text-base sm:text-lg">
      <li>Just Starting to run</li>
      <li>A former NCAA athlete who wants to continue competing</li>
      <li>Training for a marathon, half marathon, or any other distance</li>
      <li>
        Gearing up for cross-country (XC) this fall (we have plenty of competitive opportunities)
      </li>
      <li>Trying to walk on to the NCAA team</li>
    </ul>
    <p class="mb-4 text-base sm:text-lg">
      Click the link below to view the fall training plan. If you have any questions, DM George
      Crowder, Jill Crunkilton, or Evan O'Connor on groupme!
    </p>
    <div class="mt-6 text-center">
      <a
        href="https://docs.google.com/spreadsheets/d/1k_5yeLDpAi9ZuugI64PB2xb2blaztNx88Zc1rrSJiGE/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-700"
      >
        Open Fall Training Plan
      </a>
    </div>
  </div>
</div>
