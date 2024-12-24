<script lang="ts">
  import { Instagram, Users } from 'svelte-feather-icons';
  export let data;
</script>

<svelte:head>
  <title>About Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">About Liberty Running Club</h1>

  <div class="grid md:grid-cols-2 gap-12 mb-12">
    <div>
      <img src="/images/team-photo.jpg" alt="Liberty Running Club Team" class="rounded-lg shadow-lg w-full h-auto" />
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
      <p class="mb-4">
        Liberty Running Club is dedicated to fostering a community of runners who seek to glorify God through their passion for running. We believe that every stride we take is an opportunity to honor our Creator and inspire others.
      </p>
      <h2 class="text-2xl font-semibold mb-4">What We Do</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Weekly group runs for all levels</li>
        <li>Monthly devotional and prayer meetings</li>
        <li>Participation in local and regional races</li>
        <li>Community outreach through running-related service projects</li>
      </ul>
      <h2 class="text-2xl font-semibold mb-4">Join Us</h2>
      <p class="mb-4">
        Whether you're a seasoned runner or just starting out, we welcome you to join our community. Together, we can encourage one another, improve our physical health, and grow in our faith.
      </p>
      <div class="flex space-x-4">
        <a href="https://instagram.com/libertyrunningclub" target="_blank" rel="noopener noreferrer" class="text-gray-800 hover:text-primary-600 transition duration-300">
          <Instagram size="24" />
        </a>
        <a href="https://groupme.com/join_group/12345678/abcdefgh" target="_blank" rel="noopener noreferrer" class="text-gray-800 hover:text-primary-600 transition duration-300">
          <Users size="24" />
        </a>
      </div>
    </div>
  </div>

  <h2 class="text-3xl font-semibold mb-6 text-center">Our Leadership Team</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.leaders as leader}
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={leader.image_url} alt={leader.name} class="w-full h-64 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{leader.name}</h3>
          <p class="text-primary-600 mb-2">{leader.position}</p>
          <p class="text-gray-700">{leader.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

