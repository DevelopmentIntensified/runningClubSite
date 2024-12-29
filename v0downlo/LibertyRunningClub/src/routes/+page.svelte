<script>
  import { onMount } from 'svelte';
  import { Instagram, Users } from 'svelte-feather-icons';

  let currentSlide = 0;
  const slides = [
    { image: '/images/runner1.jpg', alt: 'Runner at sunset' },
    { image: '/images/runner2.jpg', alt: 'Group running together' },
    { image: '/images/runner3.jpg', alt: 'Runner crossing finish line' },
  ];

  onMount(() => {
    const interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
    }, 5000);

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
      <img src={slide.image} alt={slide.alt} class="object-cover w-full h-full" />
    </div>
  {/each}

  <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
    <h1 class="text-5xl font-bold mb-4">Liberty Running Club</h1>
    <p class="text-2xl mb-8">Running and Glorifying God through every step</p>
    <a
      href="/about"
      class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Learn More
    </a>

    <div class="mt-12 flex space-x-4">
      <a href="https://instagram.com/libertyrunningclub" target="_blank" rel="noopener noreferrer" class="text-white hover:text-red-400 transition duration-300">
        <Instagram size="24" />
      </a>
      <a href="https://groupme.com/join_group/12345678/abcdefgh" target="_blank" rel="noopener noreferrer" class="text-white hover:text-red-400 transition duration-300">
        <Users size="24" />
      </a>
    </div>
  </div>
</div>

