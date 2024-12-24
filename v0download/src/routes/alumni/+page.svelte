<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Alumni - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Liberty Running Club Alumni</h1>

  <p class="text-center text-lg mb-12 max-w-3xl mx-auto">
    Our alumni have gone on to achieve great things both on and off the track. 
    They continue to inspire current members and embody the values of faith, 
    perseverance, and excellence that define the Liberty Running Club.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.alumni as alum}
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={alum.image_url} alt={alum.name} class="w-full h-64 object-cover" />
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{alum.name}</h3>
          <p class="text-primary-600 mb-2">Class of {alum.graduation_year}</p>
          <p class="text-gray-700 mb-2"><strong>Major:</strong> {alum.major}</p>
          <p class="text-gray-700 mb-2"><strong>Achievements:</strong> {alum.achievements}</p>
          <p class="text-gray-700"><strong>Current:</strong> {alum.current_occupation}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="mt-12 text-center">
    <p class="mb-4">Are you an alumnus of Liberty Running Club? We'd love to hear from you!</p>
    <a href="/contact" class="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded transition duration-300">
      Get in Touch
    </a>
  </div>
</div>

