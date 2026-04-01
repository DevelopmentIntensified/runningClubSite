<script>
  import InstagramIcon from "$lib/components/InstagramIcon.svelte";

</script>

<svelte:head>
  <title>About Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-12 text-center">About Liberty Running Club</h1>

  <div class="space-y-16">
    <section class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="relative h-64 sm:h-80 md:h-96">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Runners in action"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">
            Our Mission
          </h2>
        </div>
      </div>
      <div class="p-6 sm:p-8 md:p-10">
        <p class="text-lg mb-6">
          Liberty Running Club is dedicated to fostering a community of runners who seek to glorify God through their passion for running. We believe that every stride we take is an opportunity to honor our Creator and inspire others.
        </p>
      </div>
    </section>

    <section class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="relative h-64 sm:h-80 md:h-96">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Group running together"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">
            What We Do
          </h2>
        </div>
      </div>
      <div class="p-6 sm:p-8 md:p-10">
        <ul class="list-disc list-inside space-y-2 text-lg">
          <li>Weekly group runs for all levels</li>
          <li>Monthly devotional and prayer meetings</li>
          <li>Participation in local and regional races</li>
          <li>Community outreach through running-related service projects</li>
        </ul>
      </div>
    </section>

    <section class="bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="relative h-64 sm:h-80 md:h-96">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Diverse group of runners"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">
            Join Us
          </h2>
        </div>
      </div>
      <div class="p-6 sm:p-8 md:p-10">
        <p class="text-lg mb-6">
          Whether you're a seasoned runner or just starting out, we welcome you to join our community. Together, we can encourage one another, improve our physical health, and grow in our faith.
        </p>
        <div class="flex space-x-4">
          <a href="https://instagram.com/libertyrunningclub" target="_blank" rel="noopener noreferrer" class="text-gray-800 hover:text-red-600 transition duration-300">
            <InstagramIcon size="24" />
          </a>
        </div>
      </div>
    </section>
  </div>
</div>


