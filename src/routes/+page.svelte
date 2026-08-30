<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let currentSlide = $state(0);
  const slides = data.slides;
  let clickCount = $state(0);
  let showSuperSpeed = $state(false);

  onMount(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
    }, 3500);

    return () => clearInterval(interval);
  });

  function handleHeroClick() {
    clickCount++;
    if (clickCount >= 10) {
      showSuperSpeed = true;
      setTimeout(() => {
        showSuperSpeed = false;
        clickCount = 0;
      }, 2000);
    }
  }
</script>

<svelte:head>
  <title>Liberty Running Club - Running for God's Glory</title>
  <meta
    name="description"
    content="Liberty University's official running club. Run, worship, and glorify God through every step. See the schedule, join our community, and check out our records."
  />
</svelte:head>

{#if showSuperSpeed}
  <div class="bg-primary-700/90 fixed inset-0 z-50 flex items-center justify-center">
    <div class="text-center text-white">
      <div class="animate-pulse text-6xl">🏃💨💨💨</div>
      <h2 class="mt-4 text-3xl font-bold">SUPER SPEED UNLOCKED!</h2>
      <p class="mt-2">You clicked {clickCount} times! Just like our founding members!</p>
    </div>
  </div>
{/if}

<div
  class="relative h-screen cursor-pointer"
  tabindex="0"
  on:click={handleHeroClick}
  on:keydown={(e) => e.key === 'Enter' && handleHeroClick()}
>
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
    class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center text-white"
  >
    <h1 class="mb-4 text-5xl font-bold">Liberty Running Club</h1>
    <p class="mb-8 text-2xl">Running and Glorifying God through every step</p>
    <a
      href="/about"
      class="bg-primary-700 hover:bg-primary-800 rounded px-4 py-2 font-bold text-white transition duration-300"
    >
      Learn More
    </a>
    <a
      href={!$page.data.isLoggedIn
        ? '/login'
        : $page.data.canAccess?.['groupme']
          ? '/groupme'
          : '/no-access'}
      class="bg-secondary-700 hover:bg-secondary-800 mt-3 rounded px-4 py-2 font-bold text-white transition duration-300"
    >
      Join Us
    </a>

    <div class="mt-5 flex space-x-4"></div>
  </div>
</div>
