<script lang="ts">
  import teamPhoto from '$lib/assets/images/social/shraptop.jpeg';
  import InstagramIcon from '$lib/components/InstagramIcon.svelte';

  import type { PageData } from './$types';
  export let data: PageData;
  const leaders = data.leaders
</script>

<svelte:head>
  <title>About Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="mb-8 text-center text-4xl font-bold">About Liberty Running Club</h1>

  <div class="mb-12 grid gap-12 md:grid-cols-2">
    <div>
      <img
        src={teamPhoto}
        alt="Liberty Running Club Team"
        class="h-auto w-full rounded-lg shadow-lg"
      />
    </div>
    <div>
      <h2 class="mb-4 text-2xl font-semibold">Our Mission</h2>
      <p class="mb-4">
        Liberty Running Club is dedicated to fostering a community of runners who seek to glorify
        God through their passion for running. We believe that every stride we take is an
        opportunity to honor our Creator and inspire others.
      </p>
      <h2 class="mb-4 text-2xl font-semibold">What We Do</h2>
      <ul class="mb-4 list-inside list-disc">
        <li>Weekly group runs for all levels</li>
        <li>Monthly devotional and prayer meetings</li>
        <li>Participation in local and regional races through NIRCA</li>
        <li>Community outreach through running-related service projects</li>
      </ul>
      <h2 class="mb-4 text-2xl font-semibold">Join Us</h2>
      <p class="mb-4">
        Whether you're a seasoned runner or just starting out, we welcome you to join our community.
        Together, we can encourage one another, improve our physical health, and grow in our faith.
      </p>
      <div class="flex space-x-4">
        <a
          href="https://instagram.com/libertyrunningclub"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-800 transition duration-300 hover:text-primary-600"
        >
          <InstagramIcon class="h-6 w-6" />
        </a>
        <!-- <a -->
        <!-- 	href="https://groupme.com/join_group/12345678/abcdefgh" -->
        <!-- 	target="_blank" -->
        <!-- 	rel="noopener noreferrer" -->
        <!-- 	class="text-gray-800 transition duration-300 hover:text-primary-600" -->
        <!-- > -->
        <!-- 	<GroupmeIcon class="h-6 w-6" /> -->
        <!-- </a> -->
      </div>
    </div>
  </div>

  <h2 class="mb-6 text-center text-3xl font-semibold">Our Leadership Team</h2>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each leaders as leader}
      <div class="overflow-hidden rounded-lg bg-white shadow-lg">
        <img src={leader.imageUrl} alt={leader.name} class="h-72 w-full object-cover" />
        <div class="p-6">
          <h3 class="mb-2 text-xl font-semibold">{leader.name}</h3>
          <p class="mb-2 text-primary-600">{leader.position}</p>
          <p class="text-gray-700">{leader.bio}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
