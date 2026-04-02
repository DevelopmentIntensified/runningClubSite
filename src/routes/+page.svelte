<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  export let data: PageData;

  let currentSlide = 0;
  const slides = data.slides;
  onMount(() => {
    const interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
    }, 3500);

    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>Liberty Running Club - Running for God's Glory</title>
</svelte:head>

<div class="relative h-screen">
  {#each slides as slide, i}
    <div
      class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      class:opacity-100={i === currentSlide}
      class:opacity-0={i !== currentSlide}
    >
      <img src={slide.image} alt={slide.alt} class="h-full w-full object-cover" />
    </div>
  {/each}

  <div
    class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center text-white"
  >
    <h1 class="mb-4 text-5xl font-bold">Liberty Running Club</h1>
    <p class="mb-8 text-2xl">Running and Glorifying God through every step</p>
    <a
      href="/about"
      class="rounded bg-red-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-red-700"
    >
      Learn More
    </a>
    <a
      href={data.isLoggedIn ? '/groupme' : '/login'}
      class="mt-3 rounded bg-secondary px-4 py-2 font-bold text-white transition duration-300 hover:bg-secondary-900"
    >
      Join Us
    </a>

    <div class="mt-5 flex space-x-4"></div>
  </div>
</div>
